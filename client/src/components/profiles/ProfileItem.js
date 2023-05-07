/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import mail from '../../images/mail.svg'
import logo from '../../images/dummyimage.jpg'
import { motion } from 'framer-motion'
import PersonalMessage from '../chat/PersonalMessage'
import NotePeoplePopUp from '../posts/NotePeoplePopUp'
import noteimg from '../../images/icons/summarize-24px.svg'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Tooltip from '@material-ui/core/Tooltip'
import CRequest from './CRequest'

const ProfileItem = ({ item, displayAdd, docs }) => {
  const [start, setStart] = useState(false)
  const [show, setShow] = useState(false)

  const close = () => {
    setShow(false)
  }

  const chatClose = () => {
    setStart(false)
  }

  const documents =
    docs &&
    docs.filter(
      (doc) =>
        doc?.userId === item?.user?._id &&
        doc?.type !== 'Audio' &&
        doc?.type !== 'Blog'
    )

  return (
    <>
      <NotePeoplePopUp
        show={show}
        close={close}
        id={item?._id}
        avatar={item?.avatar}
        status={item?.status}
        user={item?.user}
      />
      <div className="connect-container">
        <div className="connect-main">
          <div className="connect-left">
            <div className="connect-left-top">
              <div
                style={{
                  background: `url(${
                    item?.avatar ? item?.avatar : logo
                  }) no-repeat center center/cover`,
                }}
                className="display-pic"
              ></div>
              <div className="flex-c">
                <p>
                  <span className="bold">
                    {item?.user?.fullName && item?.user?.fullName}
                    {item?.user?.groupName && item?.user?.groupName}
                  </span>{' '}
                  <br />
                  <span className="second-bold"></span>{' '}
                  <span className="second-bold">{item?.status}</span> <br />
                  <span className="second-bold">{item?.location}</span>
                  <br />
                  <span className="third-bold">
                    Connections :{' '}
                    <span className="f-1">{item?.buddies.length}</span>
                  </span>
                </p>
              </div>
              <div className="note">
                {' '}
                <a href="#!" onClick={() => setShow(true)}>
                  <Tooltip title="Note Profile" placement="top">
                    <img src={noteimg} alt="" />
                  </Tooltip>
                </a>
              </div>
            </div>

            <div className="connect-left-bottom">
              <div className="btn-b">
                {' '}
                <Link to={`/portfolio/${item?.user}`} className="btn-blue">
                  Portfolio
                </Link>
              </div>
              <CRequest item={item} />
              <div className="btn-g">
                <Tooltip title="Chat" placement="top">
                  <a
                    onClick={() => {
                      setStart(true)
                    }}
                    className="btn-blue g-1"
                  >
                    <img src={mail} alt="" />
                  </a>
                </Tooltip>
              </div>
            </div>
          </div>

          {displayAdd && (
            <div className="connect-right">
              {documents &&
                documents.slice(0, 4).map((doc) => (
                  <div className="pic-1" key={doc.id}>
                    {doc.type === 'Video' ? (
                      <motion.video
                        controls
                        src={doc.url}
                        alt="uploaded pic"
                        initial={{
                          opacity: 0,
                          height: '100%',
                          width: '100%',
                        }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      />
                    ) : (
                      <motion.img
                        src={doc.url}
                        height="100%"
                        width="100%"
                        alt=""
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          {documents.length > 0 && (
            <Link to={`/portfolio/${item?.user?._id}`}>
              <Tooltip title="View Portfolio" placement="top">
                <ArrowForwardIosIcon />
              </Tooltip>
            </Link>
          )}
        </div>
      </div>

      {start && <PersonalMessage member={item} chatClose={chatClose} />}
    </>
  )
}

export default ProfileItem
