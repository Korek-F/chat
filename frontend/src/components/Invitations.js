import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptInvitation, getInvitations } from '../actions/chatActions'
import { LoadingAndError } from './LoadingAndError'

export const Invitations = () => {
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chatData)
    const { chatLoading, invitations, error } = chatData

    useEffect(() => {
        dispatch(getInvitations())
    }, [])

    const acceptInvitationClick = (invitationId) => {
        dispatch(acceptInvitation(invitationId))

    }

    return (
        <>
            {!chatLoading &&
                <>
                    {invitations.length === 0 ? "You don't have any pending invitations" :
                        <>
                            {
                                invitations.map(i =>
                                    <div key={i.from_user.id}>
                                        {i.from_user.email}
                                        <button onClick={() => acceptInvitationClick(i.id)}>Confirm</button>
                                    </div>
                                )
                            }
                        </>
                    }
                </>
            }

            <LoadingAndError loading={chatLoading} error={error} />
        </>
    )
}
