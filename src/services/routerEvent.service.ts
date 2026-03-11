import { dataSource } from "../config/database.js";

export const getRouterEvents = async () => {

    const events = await dataSource.query(`
    SELECT
    e.device_id AS "deviceId",
    e."timestamp",
    e.type,
    e.details,
    m.member_code,
    m.device_type,
    COALESCE(m.hhid, rhm.hhid) AS hhid
    FROM router_events e
                                
    LEFT JOIN member_events m
    ON (
        e.device_id = m.device_id
    AND (
            (e.details->'device_details'->>'mac') = m.mac
        OR (e.details->'device_details'->>'ip') = m.ip
        OR (e.details->'domain_activity'->>'source_ip') = m.ip
    )
    )

    LEFT JOIN router_household_map rhm
    ON e.device_id = rhm.device_id

    ORDER BY e."timestamp" DESC;
    `);

    console.log("ROUTER EVENT SERVICE LOADED");

  return events;
};