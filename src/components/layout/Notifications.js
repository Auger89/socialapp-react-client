import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { useUser } from '../../contexts/userContext';

const buildNotificationText = notif => {
  const verb = notif.type === 'like' ? 'liked' : 'commented on';
  const time = dayjs(notif.createdAt).fromNow();
  return `${notif.sender} ${verb} your scream ${time}`;
};

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userDetails, markNotificationsRead } = useUser();
  const { notifications } = userDetails || {};
  const [activeNotifications, setActiveNotifications] = useState();
  dayjs.extend(relativeTime);

  // TODO review this usEeffect
  useEffect(() => {
    const notReadNotifications =
      notifications && notifications.length > 0
        ? notifications.filter(notif => !notif.read)
        : [];
    setActiveNotifications(notReadNotifications);
  }, [notifications]);

  const open = evt => setAnchorEl(evt.target);
  const close = () => setAnchorEl(null);
  const onMenuOpened = async () => {
    if (notifications && activeNotifications.length > 0) {
      const notificationIds = notifications
        .filter(notif => !notif.read)
        .map(notif => notif.id);
      await markNotificationsRead(notificationIds);
    }
  };

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(notif => {
        const iconColor = notif.read ? 'primary' : 'secondary';
        const icon =
          notif.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRigth: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRigth: 10 }} />
          );

        return (
          <MenuItem key={notif.createdAt} onClick={close}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${notif.recipient}/scream/${notif.screamId}`}
            >
              {buildNotificationText(notif)}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={close}>You have no otifications yet</MenuItem>
    );

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={open}
          style={{ color: '#fff' }}
        >
          {notifications &&
          notifications.length > 0 &&
          activeNotifications.length > 0 ? (
            <Badge badgeContent={activeNotifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          ) : (
            <NotificationsIcon />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notifications;
