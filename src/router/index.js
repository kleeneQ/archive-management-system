import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
import Login from '@/components/Login.vue'
import Home from '@/views/Home/Home.vue'
import MessageListPage from '@/views/Home/MessageListPage'
import Welcome from '@/views/Home/Welcome/Welcome.vue'
import Users from '@/views/Home/User/Users.vue'
import PersonalCenter from '@/views/Home/User/PersonalCenter.vue'
import Roles from '@/views/Home/Roles/Roles.vue'
import Menumange from '@/views/Home/SystemManage/Menumange.vue'
import BackInfo from '@/views/Home/SystemManage/BackInfo.vue'
import Dictionary from '../views/Home/SystemManage/Dictionary.vue'
import SystemDictionary from '@/views/Home/SystemManage/SystemDictionary.vue'
import ArchivesCate from '@/views/Home/SystemManage/ArchivesCate.vue'
import AuditMenumange from '@/views/Home/SystemManage/AuditMenumange.vue'
import SystemLog from '@/views/Home/SystemManage/SystemLog'
import Municipal from '../views/Home/Engineering/Municipal.vue'
import Architecture from '../views/Home/Engineering/Architecture.vue'
import ArchivalDescription from '@/views/Home/Digitization/ArchivalDescription.vue'
import DescriptionPage from '@/views/Home/Digitization/DescriptionPage.vue'
import ManagePage from '@/views/Home/Digitization/ManagePage.vue'
import DigitCheck from '@/views/Home/Audit/digitcheck.vue'
import Filedetail from '@/views/Home/Audit/filedetail.vue'
import Packing from '@/views/Home/packing/packing'
import BoxShelving from '@/views/Home/BoxShelving/Boxshelving'
import LibraryManage from '@/views/Home/StoreHouse/LibraryManage'
import StoreHouseStatus from '@/views/Home/StoreHouse/StoreHouseStatus'
import MedicateManage from '@/views/Home/StoreHouse/MedicateManage'
import HumitureManage from '@/views/Home/StoreHouse/humitureManage'
import StoreHouseRegulations from '@/views/Home/StoreHouse/StoreHouseRegulations'
import RegulationPreview from '@/views/Home/StoreHouse/regulationpreview'
import BackPage from "@/views/Home/BoxShelving/backpage"
import PlacePaper from '@/views/Home/utilization/placepaper'
import PlaceAudio from '@/views/Home/utilization/PlaceAudio'
import PlaceElectronics from '@/views/Home/utilization/PlaceElectronics'
import Catalogueengineering from '@/views/Home/catalogue/Catalogueengineering'
import Catalogueproject from '@/views/Home/catalogue/Catalogueproject'
import Cataloguefiles from '@/views/Home/catalogue/Cataloguefiles'
import Cataloguefile from '@/views/Home/catalogue/Cataloguefile'
import SearchEngineering from '@/views/Home/RecorSearch/SearchEngineering'
import SearchPage from '@/views/Home/RecorSearch/searchPage'
import SearchProject from '@/views/Home/RecorSearch/SearchProject'
import searchProjectPage from '@/views/Home/RecorSearch/searchProjectPage'
import SearchFiles from '@/views/Home/RecorSearch/SearchFiles'
import searchFilesPage from '@/views/Home/RecorSearch/searchFilesPage'
import searchFilePage from '@/views/Home/RecorSearch/searchFilePage'
import utilizeRecord from  '@/views/Home/utilize/utilizeRecord'
import utilizeRegister from  '@/views/Home/utilize/utilizeRegister'
import utilizeAudit from '@/views/Home/Audit/utilizeAudit'
import utilizecheck from '@/views/Home/Audit/utilizecheck'
import utilizeaudioPage from '@/views/Home/Audit/utilizeaudioPage'
import utilizeaudioPaget from '@/views/Home/utilize/utilizeaudioPaget'

import catalogAudit from '@/views/Home/Audit/catalogAudit'
import supplementcheck from '@/views/Home/Audit/supplementcheck'
import supplementcheckdetails from '@/views/Home/Audit/supplementcheckdetails'
import supplement from '@/views/Home/supplement/supplement'
import SupplementFile from '@/views/Home/supplement/SupplementFile'
import machineHome from '@/views/Home/machine/machineHome'
import machinedepartment from '@/views/Home/machine/machinedepartment'
import machineResult from '@/views/Home/machine/machineResult'
import machineCheckResult from '@/views/Home/machine/machineCheckResult'
import machinefilespage from '@/views/Home/machine/machinefilespage'
import machineIdCard from '@/views/Home/machine/machineIdCard'
import machineAudiofilespage from '@/views/Home/machine/machineAudiofilespage'


import StatisticsCollection from '@/views/Home/analysis/StatisticsCollection'
import StatisticsClassification from '@/views/Home/analysis/StatisticsClassification'
import StatisticsUtilize from '@/views/Home/analysis/StatisticsUtilize'
import StatisticsDigit from '@/views/Home/analysis/StatisticsDigit'
import StatisticsElectronic from '@/views/Home/analysis/StatisticsElectronic'
import statisticsStorehouse from '@/views/Home/analysis/statisticsStorehouse'


import utilizeEngineeringPage from '@/views/Home/Audit/utilizeEngineeringPage'
import OfflineEngineering from '@/views/Home/OfflineManage/OfflineEngineering'
import OfflineEngineeringDetailsPage from '@/views/Home/OfflineManage/OfflineEngineeringDetailsPage'
import OfflineCheck from '@/views/Home/OfflineManage/OfflineCheck'
import OfflineLack from '@/views/Home/OfflineManage/OfflineLack'
import OfflineManual from '@/views/Home/OfflineManage/OfflineManual'
import OfflineCheckOpinion from '@/views/Home/OfflineManage/OfflineCheckOpinion'

import CompilationPreview from '@/views/Home/compilation/compilationpreview'
import totalCatalogue from '@/views/Home/compilation/totalCatalogue'
import classifyCatalogue from '@/views/Home/compilation/classifyCatalogue'
import filesCatalogue from '@/views/Home/compilation/filesCatalogue'
import filesClassifyCatalogue from '@/views/Home/compilation/filesClassifyCatalogue'
import memoir from '@/views/Home/compilation/memoir'
import documentCompilation from '@/views/Home/compilation/documentCompilation'
import yearbooks from '@/views/Home/compilation/yearbooks'
import Quality from '@/views/Home/Quality/Quality'
import filesPicture from '@/views/Home/audioPicture/filesPicture'
import filesVideo from '@/views/Home/audioPicture/filesVideo'
import filesCd from '@/views/Home/audioPicture/filesCd'
import fileCollection from '@/views/Home/audioPicture/fileCollection'
import CollectionFilePage from '@/views/Home/audioPicture/CollectionFilePage'
import audioPictureFilePage from '@/views/Home/audioPicture/audioPictureFilePage'
import SearchfileCollection from '@/views/Home/RecorSearch/SearchfileCollection'
import SearchCollectionFilePage from '@/views/Home/RecorSearch/SearchCollectionFilePage'
import follow from '@/views/Home/RepairFile/follow'
import scan from '@/views/Home/RepairFile/scan'
import scanplugIn from '@/views/Home/Digitization/scanplugIn.vue'

// 馆内办公流程
import officeManage from '@/views/Home/office/officeManage.vue'
import officePrint from '@/views/Home/office/officePrint.vue'
import officeInfo from '@/views/Home/office/officeInfo.vue'
import myoffice from '@/views/Home/office/myoffice'
import officeplace from '@/views/Home/office/officeplace'
import officeUnPlace from '@/views/Home/office/officeUnPlace'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/machineHome',
    component: machineHome,
  },
  {
    path: '/machineHome/machinedepartment',
    name:'machinedepartment',
    component: machinedepartment
  },
  {
    path: '/machineHome/machineResult',
    component: machineResult
  },
  {
    path: '/machineHome/machineCheckResult',
    component: machineCheckResult
  },
  {
    path: '/machineHome/machinefilespage',
    component: machinefilespage
  },
  {
    path: '/machineHome/machineIdCard',
    component: machineIdCard
  },
  {
    path: '/machineHome/machineAudiofilespage',
    component: machineAudiofilespage
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/MessageListPage',
        component: MessageListPage
      },
      {
        path: '/backinfo',
        component: BackInfo
      },
      {
        path: '/dictionary',
        component: SystemDictionary
      },
      {
        path: '/archivesCate',
        component: ArchivesCate
      },
      {
        path: '/auditmenumange',
        component: AuditMenumange
      },
      {
        path: '/SystemLog',
        component: SystemLog
      },
      {
        path: '/dataDictionary',
        component: Dictionary
      },
      {
        path: '/menumange',
        component: Menumange
      },
      {
        path: '/municipal',
        component: Municipal
      },
      {
        path: '/architecture',
        component: Architecture
      },
      {
        path: '/list',
        component: Users
      },
      {
        path: '/role',
        component: Roles
      },
      {
        path: '/personalCenter',
        component: PersonalCenter
      },
      {
        path: '/archivalDescription',
        component: ArchivalDescription
      },
      {
        path: '/archivalDescription/description_page',
        component: DescriptionPage
      },
      {
        path: '/archivalDescription/manage_page',
        component: ManagePage
      },
      {
        path: '/digitcheck_page',
        component: DigitCheck
      },
      {
        path: '/digitcheck_page/filedetail',
        component: Filedetail
      },
      {
        path:'/utilize/utilizeAudit',
        component:utilizeAudit
      },
      {
        path:'/utilize/utilizecheck',
        component:utilizecheck
      },
      {
        path:'/utilize/utilizeaudioPage',
        component:utilizeaudioPage
      },
      {
        path: '/packing',
        component: Packing
      },
      {
        path:'/boxshelving',
        component: BoxShelving
      },
      {
        path: '/storehouse/librarymanage',
        component: LibraryManage
      },
      {
        path: '/storehouse/storehousestatus',
        component: StoreHouseStatus
      },
      {
        path: '/storehouse/medicatemanage',
        component: MedicateManage
      },
      {
        path: '/storehouse/humituremanage',
        component: HumitureManage
      },
      {
        path: '/storehouse/regulations',
        component: StoreHouseRegulations
      },
      {
        path: '/storehouse/regulationpreview',
        component: RegulationPreview
      },
      {
        path: '/boxshelving/backpage',
        component: BackPage
      },
      {
        path: '/utilization/placepaper',
        component: PlacePaper
      },
      {
        path: '/utilization/placeaudio',
        component: PlaceAudio
      },
      {
        path: '/utilization/placeelectronics',
        component: PlaceElectronics
      },
      {
        path: '/Catalogue/Catalogueengineering',
        component: Catalogueengineering
      },
      {
        path: '/Catalogue/Catalogueproject',
        component: Catalogueproject
      },
      {
        path: '/Catalogue/Cataloguefiles',
        component: Cataloguefiles
      },
      {
        path: '/Catalogue/Cataloguefile',
        component: Cataloguefile
      },
      {
        path: '/RecorSearch/SearchEngineering',
        component: SearchEngineering
      },
      {
        path: '/RecorSearch/SearchEngineering/searchPage',
        component: SearchPage
      },
      {
        path: '/RecorSearch/SearchEngineering/SearchProject',
        component: SearchProject
      },
      {
        path: '/RecorSearch/SearchEngineering/searchProjectPage',
        component: searchProjectPage
      },
      {
        path: '/RecorSearch/SearchEngineering/SearchFiles',
        component: SearchFiles
      },
      {
        path: '/RecorSearch/SearchEngineering/searchFilesPage',
        component: searchFilesPage
      },
      {
        path: '/RecorSearch/SearchEngineering/searchFilePage',
        component: searchFilePage
      },
      {
        path: '/RecorSearch/utilize/utilizeRecord',
        component: utilizeRecord
      },
      {
        path: '/RecorSearch/utilize/utilizeRegister',
        component: utilizeRegister
      },
      {
        path: '/RecorSearch/utilize/utilizeaudioPaget',
        component: utilizeaudioPaget
      },
      {
        path: '/catalogAudit',
        component: catalogAudit
      },
      {
        path: '/supplementcheck',
        component: supplementcheck
      },
      {
        path: '/supplementcheck/supplementcheckdetails',
        component: supplementcheckdetails
      },
      {
        path: '/supplement',
        component: supplement
      },
      {
        path: '/supplement/SupplementFile',
        component: SupplementFile
      },
      {
        path: '/analysis/StatisticsCollection',
        component: StatisticsCollection
      },
      {
        path: '/analysis/StatisticsClassification',
        component: StatisticsClassification
      },
      {
        path: '/analysis/StatisticsUtilize',
        component: StatisticsUtilize
      },
      {
        path: '/analysis/StatisticsDigit',
        component: StatisticsDigit
      },
      {
        path: '/analysis/StatisticsElectronic',
        component: StatisticsElectronic
      },
      {
        path: '/analysis/statisticsStorehouse',
        component: statisticsStorehouse
      },
      {
        path: '/Audit/utilizeEngineeringPage',
        component: utilizeEngineeringPage
      },
      {
        path: '/OfflineManage/OfflineEngineering',
        component: OfflineEngineering
      },
      {
        path: '/OfflineManage/OfflineEngineeringDetailsPage',
        component: OfflineEngineeringDetailsPage
      },
      {
        path: '/OfflineManage/OfflineCheck',
        component: OfflineCheck
      },
      {
        path: '/OfflineManage/OfflineLack',
        component: OfflineLack
      },
      {
        path: '/OfflineManage/OfflineManual',
        component: OfflineManual
      },
      {
        path: '/OfflineManage/OfflineCheckOpinion',
        component: OfflineCheckOpinion
      },
      {
        path: '/compilation/CompilationPreview',
        component: CompilationPreview
      },
      {
        path: '/compilation/totalCatalogue',
        component: totalCatalogue
      },
      {
        path: '/compilation/classifyCatalogue',
        component: classifyCatalogue
      },
      {
        path: '/compilation/filesCatalogue',
        component: filesCatalogue
      },
      {
        path: '/compilation/filesClassifyCatalogue',
        component: filesClassifyCatalogue
      },
      {
        path: '/compilation/memoir',
        component: memoir
      },
      {
        path: '/compilation/documentCompilation',
        component: documentCompilation
      },
      {
        path: '/compilation/yearbooks',
        component: yearbooks
      },
      {
        path: '/Quality',
        component: Quality
      },
      {
        path: '/audioPicture/audioPictureFilePage',
        component: audioPictureFilePage
      },
      {
        path: '/audioPicture/filesPicture',
        component: filesPicture
      },
      {
        path: '/audioPicture/filesVideo',
        component: filesVideo
      },
      {
        path: '/audioPicture/filesCd',
        component: filesCd
      },
      {
        path: '/audioPicture/fileCollection',
        component: fileCollection
      },
      {
        path: '/audioPicture/CollectionFilePage',
        component: CollectionFilePage
      },
      {
        path: '/RecorSearch/SearchfileCollection',
        component: SearchfileCollection
      },
      {
        path: '/RecorSearch/SearchCollectionFilePage',
        component: SearchCollectionFilePage
      },
      {
        path: '/RepairFile/follow',
        component: follow
      },
      {
        path: '/RepairFile/scan',
        component: scan
      },
      {
        path: '/Digitization/scanplugIn',
        component: scanplugIn
      },
      {
        path: '/office/officeManage',
        component: officeManage
      },
      {
        path: '/office/officePrint',
        component: officePrint
      },
      {
        path: '/office/officeInfo',
        component: officeInfo
      },
      {
        path: '/office/myoffice',
        component: myoffice
      },
      {
        path: '/office/officeplace',
        component: officeplace
      },
      {
        path: '/office/officeunplace',
        component: officeUnPlace
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路劲
  if (to.path === '/login') return next()
  var str = to.path
  if (str.indexOf("machine") != -1) return next()
  
  // from 从哪个路劲而来
  const tokenStr = getToken('token')
  if (!tokenStr) return next('/login')
  // next() 是一个函数
  // next() 放行   next('/login) 强制跳转
  next()
})

export default router
