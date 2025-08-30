import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

export const TodosSkeleton = () => (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Skeleton variant="text" width={180} height={60} sx={{ mx: "auto", mb: 2 }} />
        <Paper sx={{ p: 2, mt: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
        </Paper>
    </Container>
);

