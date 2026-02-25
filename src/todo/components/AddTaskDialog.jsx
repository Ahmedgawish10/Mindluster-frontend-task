import TaskFormDialog from './TaskFormDialog';

export default function AddTaskDialog({
  open,
  onClose,
  onSubmit,
  defaultColumn = 'backlog',
}) {
  return (
    <TaskFormDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      defaultColumn={defaultColumn}
    />
  );
}
