import Vue from 'vue'
import Router from 'vue-router'
import Employee from '@/components/Employee'
import MonthlyAudit from '@/components/MonthlyAudit'
import MainContainer from '@/components/MainContainer'
import SpecialDeduction from '@/components/SpecialDeduction'
import Salary from '@/components/Salary'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: MainContainer,
            children: [
                {
                    path: '/employee', component: Employee
                },
                {
                    path:'/monthlyAudit',component:MonthlyAudit
                },
                {
                    path:'/specialDeduction',component:SpecialDeduction
                },
                {
                    path:'/salary',component:Salary
                }
            ]
        }
    ]
})
