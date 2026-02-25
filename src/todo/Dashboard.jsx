import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchBar from '@/todo/components/common/SearchBar';
import KanbanBoard from '@/todo/components/KanbanBoard';
import { useTasksQuery } from '@/todo/hooks/useTasks';

export default function TodoDashboard() {
  const { data: tasks = [] } = useTasksQuery();
  return (
    <Box
      sx={{
        bgcolor: 'grey.100',
        backgroundColor: '#e0ecf7',
       minHeight: '100vh',

      }}
    >
      <Container maxWidth="xl" disableGutters={false} >
        <Box sx={{ flexShrink: 0, p: 2, pb: 0, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Kanban Board
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <SearchBar />
        </Box>
        <Box>
          <KanbanBoard />
        </Box>
      </Container>
    </Box>
  );
}
