'use strict';

const Service = require('egg').Service;

class MsgsService extends Service {
  async list(room_id, id) {
    const s = await this.app.mysql.query(
      'select * from msgs where id > '
      + id
      + ' and room_id IN('
      + room_id.join(',')
      + ') ORDER BY `id` DESC LIMIT 0, 100');
    return s.reverse();
  }

  async insert({ room_id, send_from, msg }) {
    await this.app.mysql.insert('msgs', {
      room_id,
      send_from,
      msg,
      send_time: new Date(),
    });
  }
}

module.exports = MsgsService;
