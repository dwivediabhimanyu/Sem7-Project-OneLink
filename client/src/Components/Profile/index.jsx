import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import {
    Container,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Icon,
    Avatar,
    Typography,
    Divider,
    CircularProgress
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { getProfile } from '../../store/actions/profileActions';
import {
    useParams
} from "react-router-dom";
import {Alert} from '@material-ui/lab'


const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            padding: '2rem'
        },
        paper: {
            padding: theme.spacing(3),
            fontFamily: 'roboto',
            width: '100%'
        },
        item: {
            marginBottom: theme.spacing(1)
        },
        btnContainer: {
            display: 'flex'
        },
        btn: {
            margin: '0 auto'
        },
        socialName: {
            width: '35%',
            marginRight: '5%'
        },
        socialHref: {
            width: '60%'
        },
        avatar: {
            background: '#3f51b5'
        }
    }),
);

const Profile = ({ profile, getProfile }) => {
    const classes = useStyles();
    let { username } = useParams();
    useEffect(() => {
        if(username) {
            getProfile(username);
        }
    }, [username])

    console.log(profile);
    return (
        <>
            <Container className={classes.container} maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    {profile && profile.error===404?<Alert variant="filled" severity="error">"ERROR 404: USER NOT FOUND"</Alert>:null}
                    <List style={{ width: '100%' }}>
                        {profile.social && profile.social.map(item => (
                            <div key={item.name + item.href.toString().slice(0, 5)}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            {item.name.slice(0, 1)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="body1">{item.href}</Typography>}
                                        secondary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <Icon>link</Icon>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete">
                                            <Icon>open_in_new</Icon>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Paper>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfile })(Profile)
