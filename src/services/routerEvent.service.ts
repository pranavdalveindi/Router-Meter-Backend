import { dataSource } from "../config/database.js";

export const getRouterEvents = async () => {

  const events = await dataSource.query(`
    SELECT
        e.device_id,
        e.timestamp,
        e.type,
        e.details,
        m.member_code
    FROM router_events e
    LEFT JOIN member_events m
    ON (
          (e.details->'device_details'->>'mac') = m.mac
       OR (e.details->'device_details'->>'ip') = m.ip
       OR (e.details->'domain_activity'->>'source_ip') = m.ip
    )
    ORDER BY e.timestamp DESC
    LIMIT 200
  `);

  return events;
};