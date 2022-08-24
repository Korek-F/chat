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
                    {invitations.length === 0 ? "You don't have any pending invitations" :
                        <>
                            {
                                invitations.map(i =>
                                    <div key={i.from_user.id} className="invitation">
                                        {i.from_user.email}
                                        <button onClick={() => acceptInvitationClick(i.id)}>Confirm</button>
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
