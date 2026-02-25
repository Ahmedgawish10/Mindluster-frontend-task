import TaskFormDialog from './TaskFormDialog';

export default function EditTaskDialog({
  open,
  onClose,
  onSubmit,
  task,
}) {
  return (
    <TaskFormDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      task={task ?? undefined}
    />
  );
}
