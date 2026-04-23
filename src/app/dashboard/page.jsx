import { auth } from '@/lib/auth';
import { redirect } from 'next/dist/server/api-utils';
import { headers } from 'next/headers';
import React from 'react';

const DashBoard = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
   
    console.log(session,"hlo");

    const user = session?.user;
    if(!user){
        // redirect('/auth/singin');
        return <div>Please sing to access The dashboard</div>
    }

    return (
        <div>
            <h2>This is DashIng Board</h2>
        </div>
    );
};

export default DashBoard;