import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import OrganizationPage from './organizationPage'

const mapStore = (store, _, { router }) => {
  const organizationId = router.getParam('organizationId')
  const organization = store.data.organizations.get(organizationId)
  const { uid: userId } = store.auth.get()
  const { origin } = window.location

  return {
    loaded: store.data.organizations.hasKey(organizationId),
    ...organization,
    authUserId: userId,
    inviteLink: `${origin}/organizer/organizations/${organizationId}/invite/${userId}`,
    load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZATION'),
    onSelectUser: uid => store.dispatch({ type: '@@ui/ADD_ORGANIZATION_MEMBER', payload: { uid, organizationId } }),
    removeMember: uid => store.dispatch({ type: '@@ui/REMOVE_ORGANIZATION_MEMBER', payload: { uid, organizationId } }),
  }
}

export default compose(
  forRoute.absolute('organizer-organization-page'),
  inject(mapStore),
  loader,
)(OrganizationPage)
