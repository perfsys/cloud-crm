import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import contacts from '@/components/contacts'
import contacts_details from '@/components/contact-details'
import contact_update from '@/components/contact-update'
import contacts_group from '@/components/contacts-group'
import contact_updates from '@/components/contact-updates'
import companies from '@/components/companies'
import company_details from '@/components/company-details'
import company_editor from '@/components/company-editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: contacts
    },
    {
      path: '/contacts/:group',
      name: 'contacts-group',
      props: true,
      component: contacts_group
    },
    {
      path: '/contacts/:group/:name/view',
      name: 'contact-details',
      props: true,
      component: contacts_details

    },
    {
      path: '/contacts/:group/:name/edit',
      name: 'contact-update',
      props: true,
      component: contact_update
    },
    {
      path: '/contacts/:group/:name/updates',
      name: 'contact_updates',
      props: true,
      component: contact_updates
    },

    {
      path: '/companies',
      name: 'companies',
      props: true,
      component: companies
    },
    {
      path: '/companies/details/:companyId',
      name: 'company-details',
      props: true,
      component: company_details
    },
    {
      path: '/companies/edit/:companyId',
      name: 'company-edit',
      props: true,
      component: company_editor
    }
  ]
})
