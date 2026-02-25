export function filterTasks(tasks, search, column) {
  const byColumn = tasks.filter((t) => t.column === column);
  if (!search.trim()) return byColumn;
  const q = search.trim().toLowerCase();
  return byColumn.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );
}
