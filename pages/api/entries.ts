// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { Entry, getDb } from "../db";

export default async (req: NextApiRequest, res: NextApiResponse<Entry[]>) => {
  const db = await getDb();

  if (req.method === "GET") {
    const entries = await db.get("entries").value();
    res.statusCode = 200;
    res.json(entries);
  } else if (req.method === "POST") {
    const entry = req.body as Entry;
    entry.id = nanoid();
    await db.get("entries").push(entry).write();
    res.statusCode = 201;
    const entries = await db.get("entries").value();
    res.json(entries);
  }
};
