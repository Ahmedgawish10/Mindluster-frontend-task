import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useDroppable } from '@dnd-kit/core';
import { filterTasks } from '@/todo/utils/filter';
import TaskCard from './common/TaskCard';

const COLUMN_DOT_COLOR = {
  backlog: '#2196f3',
  in_progress: '#ff9800',
  review: '#9c27b0',
  done: '#4caf50',
};

export default function KanbanColumn({
  columnId,
  columnLabel,
  allTasks,
  search,
  onEdit,
  onDelete,
  onAddTask,
}) {
  const filtered = filterTasks(allTasks, search, columnId);
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <Paper
      ref={setNodeRef}
      data-column-id={columnId}
      sx={{
        minHeight: 320,
        p: 2,
        flex: 1,
        minWidth: 240,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isOver ? '#97a9bb44' : '#97a9bb24',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: COLUMN_DOT_COLOR[columnId],
            flexShrink: 0,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" component="span" sx={{ flex: 1 }}>
          {columnLabel}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          color="gray"
          sx={{
            fontWeight: 700,
            px: 1,
            py: 0.25,
            borderRadius: '9999px',
            backgroundColor: 'action.hover',
          }}
        >
          {filtered.length}
        </Typography>

        </Box>

      </Box>
      <Box sx={{ flex: 1 }}>
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
       <Button
          fullWidth
          startIcon={<AddIcon />}
          variant="outlined"
          size="small"
          onClick={() => onAddTask(columnId)}
          sx={{ mt: 1 , outline: 'none !important'}}
        >
          Add task
        </Button>
      </Box>
    </Paper>
  );
}
