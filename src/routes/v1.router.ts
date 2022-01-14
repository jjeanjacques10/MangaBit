import {Router} from 'express'

import {ChapterController} from '../controller/ChapterController'
import {PageController} from '../controller/PageController'
const pageController = new PageController()
const chapterController = new ChapterController()
const router=Router()


router.get('/manga/:mangaId/chapters',chapterController.list)
router.post('/chapters',chapterController.scrap)

router.get('/manga/:mangaId/chapters/:chapterId/pages',pageController.list)

export default router