import { setAuthCookies } from 'next-firebase-auth'
import { NextRequest, NextResponse } from 'next/server'
import initAuth from '../../initAuth'

initAuth()

// const handler = async (req, res) => {
//   try {
//     await setAuthCookies(req, res)
//   } catch (e) {
//     console.log('error', e)
//     return res.status(500).json({ error: 'Unexpected error.' })
//   }
//   return res.status(200).json({ success: true })
// }

// export default handler

const handler = async (req, res) => {
  try {
    // Including unused return value to demonstrate codemod
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { user: AuthUser } = await setAuthCookies(req, res)
    console.log('AuthUser',AuthUser)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ status: true })
}

export default handler