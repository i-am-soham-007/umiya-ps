import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  StatsRepository,
  HeroRepository,
  ServicesRepository,
  PortfolioRepository,
  VideoRepository,
  TestimonialRepository,
  TimelineRepository,
  TeamRepository,
  InstagramRepository,
  BookingsRepository,
  ContactRepository
} from '../repositories/cms.repository';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'umiya_studio_secret_key_2026';

// Middleware for Admin auth verification
function authenticateAdmin(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized - Admin token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token' });
  }
}

// ----------------------------------------------------
// PUBLIC FRONTEND DYNAMIC CMS ENDPOINTS
// ----------------------------------------------------

// GET /api/home - Aggregate Home Page Data
router.get('/home', async (req: Request, res: Response) => {
  try {
    const stats = await StatsRepository.getStats();
    const heroSlides = await HeroRepository.getAll();
    const timeline = await TimelineRepository.getAll();
    const services = await ServicesRepository.getAll();
    const portfolio = await PortfolioRepository.getAll();
    const videos = await VideoRepository.getAll();
    const testimonials = await TestimonialRepository.getAll();
    const instagram = await InstagramRepository.getAll();

    return res.json({
      success: true,
      data: {
        stats,
        heroSlides,
        timeline,
        services,
        portfolio,
        videos,
        testimonials,
        instagram
      }
    });
  } catch (error: any) {
    console.error('API /home error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/stats
router.get('/stats', async (req: Request, res: Response) => {
  const stats = await StatsRepository.getStats();
  res.json({ success: true, data: stats });
});

// GET /api/hero
router.get('/hero', async (req: Request, res: Response) => {
  const slides = await HeroRepository.getAll();
  res.json({ success: true, data: slides });
});

// GET /api/services
router.get('/services', async (req: Request, res: Response) => {
  const services = await ServicesRepository.getAll();
  res.json({ success: true, data: services });
});

// GET /api/services/:idOrSlug
router.get('/services/:idOrSlug', async (req: Request, res: Response) => {
  const item = await ServicesRepository.getById(req.params.idOrSlug);
  if (!item) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: item });
});

// GET /api/portfolio
router.get('/portfolio', async (req: Request, res: Response) => {
  const items = await PortfolioRepository.getAll();
  res.json({ success: true, data: items });
});

// GET /api/videos
router.get('/videos', async (req: Request, res: Response) => {
  const items = await VideoRepository.getAll();
  res.json({ success: true, data: items });
});

// GET /api/testimonials
router.get('/testimonials', async (req: Request, res: Response) => {
  const items = await TestimonialRepository.getAll();
  res.json({ success: true, data: items });
});

// GET /api/timeline
router.get('/timeline', async (req: Request, res: Response) => {
  const items = await TimelineRepository.getAll();
  res.json({ success: true, data: items });
});

// GET /api/team
router.get('/team', async (req: Request, res: Response) => {
  const items = await TeamRepository.getAll();
  res.json({ success: true, data: items });
});

// GET /api/instagram
router.get('/instagram', async (req: Request, res: Response) => {
  const items = await InstagramRepository.getAll();
  res.json({ success: true, data: items });
});

// POST /api/booking - Submit Client Booking Consultation
router.post('/booking', async (req: Request, res: Response) => {
  try {
    const booking = await BookingsRepository.create(req.body);
    return res.json({
      success: true,
      bookingId: booking.id,
      message: `Thank you ${booking.fullName}! Your inquiry (${booking.id}) for ${booking.eventType} on ${booking.eventDate} has been registered in our database. Our Senior Director will reach out shortly.`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/contact - Submit Contact Message
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const message = await ContactRepository.create(req.body);
    return res.json({
      success: true,
      message: `Thank you ${message.name}! Message delivered to UMIYA STUDIO ${message.office} office.`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// ADMIN AUTHENTICATION
// ----------------------------------------------------

router.post('/admin/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Default login verification: username 'admin' and password 'umiya2026!' or 'admin'
  if (username === 'admin' && (password === 'umiya2026!' || password === 'admin' || password === 'admin123')) {
    const token = jwt.sign({ username: 'admin', role: 'SuperAdmin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      success: true,
      token,
      admin: { username: 'admin', name: 'Jayesh Patel (Master Admin)', role: 'SuperAdmin' }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

router.get('/admin/me', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ success: true, admin: (req as any).adminUser });
});

// ----------------------------------------------------
// ADMIN CMS CRUD API ENDPOINTS (PROTECTED)
// ----------------------------------------------------

// Stats Update
router.put('/admin/stats', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await StatsRepository.updateStats(req.body);
  res.json({ success: true, data: updated });
});

// Hero Slides CRUD
router.post('/admin/hero', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await HeroRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/hero/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await HeroRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/hero/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await HeroRepository.delete(req.params.id);
  res.json(resDel);
});

// Services CRUD
router.post('/admin/services', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await ServicesRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/services/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await ServicesRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/services/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await ServicesRepository.delete(req.params.id);
  res.json(resDel);
});

// Portfolio CRUD
router.post('/admin/portfolio', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await PortfolioRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/portfolio/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await PortfolioRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/portfolio/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await PortfolioRepository.delete(req.params.id);
  res.json(resDel);
});

// Videos CRUD
router.post('/admin/videos', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await VideoRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/videos/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await VideoRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/videos/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await VideoRepository.delete(req.params.id);
  res.json(resDel);
});

// Testimonials CRUD
router.post('/admin/testimonials', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await TestimonialRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/testimonials/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await TestimonialRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/testimonials/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await TestimonialRepository.delete(req.params.id);
  res.json(resDel);
});

// Timeline CRUD
router.post('/admin/timeline', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await TimelineRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/timeline/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await TimelineRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/timeline/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await TimelineRepository.delete(req.params.id);
  res.json(resDel);
});

// Team CRUD
router.post('/admin/team', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await TeamRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/team/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await TeamRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/team/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await TeamRepository.delete(req.params.id);
  res.json(resDel);
});

// Instagram CRUD
router.post('/admin/instagram', authenticateAdmin, async (req: Request, res: Response) => {
  const created = await InstagramRepository.create(req.body);
  res.json({ success: true, data: created });
});

router.put('/admin/instagram/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await InstagramRepository.update(req.params.id, req.body);
  res.json({ success: true, data: updated });
});

router.delete('/admin/instagram/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await InstagramRepository.delete(req.params.id);
  res.json(resDel);
});

// Bookings Leads Management
router.get('/admin/bookings', authenticateAdmin, async (req: Request, res: Response) => {
  const bookings = await BookingsRepository.getAll();
  res.json({ success: true, data: bookings });
});

router.put('/admin/bookings/:id/status', authenticateAdmin, async (req: Request, res: Response) => {
  const updated = await BookingsRepository.updateStatus(req.params.id, req.body.status);
  res.json({ success: true, data: updated });
});

router.delete('/admin/bookings/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await BookingsRepository.delete(req.params.id);
  res.json(resDel);
});

// Contact Messages Management
router.get('/admin/contact', authenticateAdmin, async (req: Request, res: Response) => {
  const messages = await ContactRepository.getAll();
  res.json({ success: true, data: messages });
});

router.delete('/admin/contact/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const resDel = await ContactRepository.delete(req.params.id);
  res.json(resDel);
});

export default router;
