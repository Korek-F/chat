import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptInvitation, getInvitations } from '../actions/chatActions'

export const Invitations = () => {
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chatData)
    const { chatLoading, invitations } = chatData

    useEffect(() => {
        dispatch(getInvitations())
    }, [])

    const acceptInvitationClick = (invitationId) => {
        dispatch(acceptInvitation(invitationId))
    }

    return (
        <>
            {chatLoading ? "Loading" :
                <>
                    {invitations.map(i =>
                        <div key={i.from_user.id}>
                            {i.from_user.email}
                            <button onClick={() => acceptInvitationClick(i.id)}>Confirm</button>
                        </div>
                    )}
                </>
            }
        </>
    )
}
