import PostContainer from "../components/post/PostContainer"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        margin:20,
    }
});
export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <PostContainer/>
                </Grid> 
                <Grid item xs={5}>
                    a
                </Grid>
            </Grid>
            
        </div>
    )
}
