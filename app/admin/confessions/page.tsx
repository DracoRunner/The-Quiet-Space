import ConfessionsAdminTable from "##/components/admin/ConfessionsAdminTable";
import ConfessionDB from "##/DataBase/ConfessionDB";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function AdminConfessionsPage() {
  const confessions = await ConfessionDB.getAllConfessions();

  const confessionRows = confessions.map((c: unknown) => {
    const r = c as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      slug: String(r.id ?? ""),
      content: String(r.content ?? ""),
    };
  });

  return <ConfessionsAdminTable confessions={confessionRows} />;
}
