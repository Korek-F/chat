import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptInvitation, getInvitations } from '../actions/chatActions'

export const Invitations = () => {
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chatData)
    const { chatLoading, invitations } = chatData

    useEffect(() => {
        dispatch(getInvitations())
    }, [dispatch])

    const acceptInvitationClick = (invitationId) => {
        dispatch(acceptInvitation(invitationId))

    }

    return (
        <div className='invitations'>
            {!chatLoading &&
                <>
                    {invitations.length === 0 ?
                        <p className='info'> You don't have any pending invitations </p> :
                        <>
                            {
                                invitations.map(i =>
                                    <div key={i.from_user.id} className="invitation">
                                        <p> {i.from_user.username}</p>
                                        <button className='my_btn btn_success'
                                            onClick={() => acceptInvitationClick(i.id)}>Confirm</button>
                                    </div>
                                )
                            }
                        </>
                    }
                </>
            }

        </div>
    )
}
