import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/todo/store/uiSlice';
import { COLUMNS } from '@/todo/constants';
import { filterTasks } from '@/todo/utils/filter';
import { useTasksQuery, useCreateTask, useUpdateTask, useDeleteTask, useMoveTask } from '@/todo/hooks/useTasks';
import KanbanColumn from './KanbanColumn';
import AddTaskDialog from './AddTaskDialog';
import EditTaskDialog from './EditTaskDialog';

const DATA_TRANSFER_TASK_KEY = 'application/todos';

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { data: tasks = [], isLoading, error } = useTasksQuery();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const moveTask = useMoveTask();

  const search = useSelector((s) => s.todoUi.search);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultColumnForCreate, setDefaultColumnForCreate] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDragStart = useCallback((e, task) => {
    e.dataTransfer.setData(DATA_TRANSFER_TASK_KEY, String(task.id));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (e, targetColumn) => {
      e.preventDefault();
      const idStr = e.dataTransfer.getData(DATA_TRANSFER_TASK_KEY);
      if (!idStr) return;
      const id = Number(idStr);
      if (Number.isNaN(id)) return;
      moveTask.mutate({ id, body: { column: targetColumn } });
    },
    [moveTask]
  );

  const handleAddTask = (column) => {
    setDefaultColumnForCreate(column ?? null);
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setDefaultColumnForCreate(null);
  };

  const handleAddSubmit = (data) => {
    createTask.mutate(data);
    handleCloseAddDialog();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseEditDialog = () => {
    setEditingTask(null);
  };

  const handleEditSubmit = (data) => {
    if (editingTask) {
      updateTask.mutate({
        id: editingTask.id,
        body: { title: data.title, description: data.description, column: data.column, priority: data.priority },
      });
      setEditingTask(null);
    }
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteDialog = () => setTaskToDelete(null);

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  if (isLoading) return <Box sx={{ p: 2 }}>Loading tasks...</Box>;
  if (error) return <Box sx={{ p: 2, color: 'error.main' }}>Failed to load tasks. Is the API running on port 4000?</Box>;

  const visibleColumns =
    search.trim() === ''
      ? COLUMNS
      : COLUMNS.filter(
          (col) => filterTasks(tasks, search, col.id).length > 0
        );

  const noMatches = search.trim() !== '' && visibleColumns.length === 0;

  return (
    <Box sx={{ p: 2 }}>
      {noMatches ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <DialogContentText sx={{ mb: 2 }}>
            No tasks match &quot;{search.trim()}&quot;
          </DialogContentText>
          <Button variant="contained" onClick={() => dispatch(setSearch(''))}>
            Reset search
          </Button>
        </Box>
      ) : (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {visibleColumns.map((col) => (
          <KanbanColumn
            key={col.id}
            columnId={col.id}
            columnLabel={col.label}
            allTasks={tasks}
            search={search}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddTask={handleAddTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </Box>
      )}
      <AddTaskDialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddSubmit}
        defaultColumn={defaultColumnForCreate ?? undefined}
      />

      <EditTaskDialog
        open={!!editingTask}
        onClose={handleCloseEditDialog}
        onSubmit={handleEditSubmit}
        task={editingTask}
      />

      <Dialog open={!!taskToDelete} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Delete task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {taskToDelete
              ? `Are you sure you want to delete "${taskToDelete.title}"? This cannot be undone.`
              : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
