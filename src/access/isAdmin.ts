import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.roles === 'admin'
}
