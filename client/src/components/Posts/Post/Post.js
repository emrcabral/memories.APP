import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from "../../../actions/posts"; 

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length}`}</>
                ) : (
                    <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length}</>
                );
        }
         
        return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;</>;
    };


    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post.creator || user?.result?.sub === post.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            { user && (
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                        <Likes />
                    </Button>
                    {(user.result._id === post.creator || user.result.sub === post.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" />
                        </Button>
                    )}
                </CardActions>
            )}
        </Card>
    );
}

export default Post;