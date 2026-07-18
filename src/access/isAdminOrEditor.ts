import type { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.roles === 'admin' || user?.roles === 'editor'
}
