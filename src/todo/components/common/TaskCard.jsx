import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const priorityColors = {
  low: 'default',
  medium: 'info',
  high: 'warning',
  urgent: 'error',
};

function PriorityChip({ priority }) {
  return (
    <Chip
      label={priority}
      size="small"
      color={priorityColors[priority]}
      sx={{ mt: 0.5, textTransform: 'capitalize' }}
    />
  );
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: String(task.id), data: { task } });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    mb: 1,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={style}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography variant="subtitle2" fontWeight="bold" noWrap>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
          {task.description}
        </Typography>
        <PriorityChip priority={task.priority ?? 'medium'} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }} onPointerDown={(e) => e.stopPropagation()}>
          <IconButton size="small" sx={{ outline: 'none !important' }} onClick={() => onEdit(task)} aria-label="Edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ outline: 'none !important' }}  onClick={() => onDelete(task)} aria-label="Delete" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
