import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Download, 
  LayoutDashboard,
  Briefcase, 
  BarChart3, 
  User, 
  CheckCircle2, 
  Users, 
  Brain, 
  MessageSquare, 
  Search,
  Share2,
  BookOpen,
  PlusCircle,
  Lightbulb,
  Backpack,
  GraduationCap,
  ArrowRightLeft,
  Settings,
  Bell,
  MapPin,
  Phone,
  Lock,
  Eye,
  LogOut,
  FileText,
  Clock,
  XCircle,
  Plus,
  Globe,
  Languages,
  X,
  Pencil,
  UserRound,
  ShieldCheck,
  FilePlus,
  Palette,
  Trash2,
  UsersRound
} from 'lucide-react';
import { cn } from './lib/utils';

// --- TYPES ---
type Tab = 'dashboard' | 'backpack' | 'impact' | 'profile' | 'opportunities' | 'settings' | 'manage-profile' | 'languages' | 'cv-preview' | 'skill-verification';
type Role = 'student' | 'educator';

// --- COMPONENTS ---

const AppLogo = ({ className = "w-8 h-8", padding = "p-0" }: { className?: string, padding?: string }) => (
  <div className={cn("relative flex items-center justify-center bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden", className, padding)}>
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYrXomQYOhdgPcAlAEXayrNWlPX-VBTAvTw&s" 
      alt="Skill Path Logo" 
      className="w-full h-full object-contain mix-blend-multiply"
      referrerPolicy="no-referrer"
    />
  </div>
);

const TopAppBar = ({ role, onLogout }: { role: Role, onLogout: () => void }) => (
  <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-surface/95 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
    <div className="flex items-center gap-4">
      <AppLogo className="w-10 h-10 shadow-md" padding="p-1" />
      <h1 className="font-garamond text-xl font-bold text-primary hidden sm:block">Skill Path</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-[10px] font-bold text-primary uppercase tracking-tight">
        {role === 'educator' ? 'Educatore' : 'Studente'}
      </div>
      <button 
        onClick={onLogout}
        className="p-2 hover:bg-cta-red/5 rounded-xl text-cta-red transition-all duration-200 active:scale-90"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  </header>
);

const LoginView = ({ onLogin }: { onLogin: (role: Role) => void }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-12"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mb-6"
        >
          <AppLogo className="w-24 h-24 shadow-2xl shadow-primary/20 rounded-[2.5rem]" padding="p-2" />
        </motion.div>
        <h1 className="font-garamond text-5xl font-bold text-primary mb-2">Skill Path</h1>
        <p className="text-on-surface-variant font-medium text-center max-w-[280px]">
          Monitoraggio territoriale dell'impatto delle competenze.
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm space-y-4"
      >
        <div className="grid grid-cols-2 gap-4 p-1.5 bg-surface-container rounded-3xl border border-outline-variant/30">
          <button 
            onClick={() => setSelectedRole('student')}
            className={cn(
              "flex flex-col items-center gap-2 py-6 rounded-2xl transition-all duration-300",
              selectedRole === 'student' 
                ? "bg-white shadow-lg text-primary scale-100" 
                : "text-on-surface-variant/60 hover:text-on-surface-variant"
            )}
          >
            <UserRound className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-widest">Studente</span>
          </button>
          <button 
            onClick={() => setSelectedRole('educator')}
            className={cn(
              "flex flex-col items-center gap-2 py-6 rounded-2xl transition-all duration-300",
              selectedRole === 'educator' 
                ? "bg-white shadow-lg text-primary scale-100" 
                : "text-on-surface-variant/60 hover:text-on-surface-variant"
            )}
          >
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-widest">Educatore</span>
          </button>
        </div>

        <button 
          onClick={() => onLogin(selectedRole)}
          className="w-full py-5 rounded-3xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-primary-container hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
        >
          Accedi <ArrowRightLeft className="w-4 h-4 rotate-180" />
        </button>
      </motion.div>

      <div className="mt-16 text-center">
        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">© 2024 Skill Path - Versione 1.0</p>
      </div>
    </motion.div>
  );
};

const OpportunityView = ({ opportunities, onCreate, onEdit }: { 
  opportunities: any[], 
  onCreate: () => void, 
  onEdit: (opp: any) => void 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6"
  >
    <button 
      onClick={onCreate}
      className="w-full border-2 border-dashed border-outline-variant py-8 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-primary hover:bg-primary/5 transition-all text-on-surface-variant hover:text-primary active:scale-[0.98]"
    >
      <PlusCircle className="w-8 h-8 opacity-50 group-hover:opacity-100" />
      <span className="font-bold">Crea Nuova Opportunità</span>
    </button>

    <section>
      <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Opportunità</h2>
      <p className="text-on-surface-variant">Aggiungi nuove esperienze formative per il tuo territorio.</p>
    </section>

    <div className="grid grid-cols-1 gap-4">
      {opportunities.map((opp, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <span className={cn(
              "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
              opp.type === 'Colloquio' ? "bg-cta-red/10 text-cta-red" : 
              opp.type === 'Stage' ? "bg-secondary-container/30 text-secondary" : 
              "bg-primary/10 text-primary"
            )}>
              {opp.type}
            </span>
            <div className="flex items-center gap-1 text-on-surface-variant text-xs">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium">{opp.students} iscritti</span>
            </div>
          </div>
          <h3 className="font-garamond text-lg font-bold text-primary mb-1 group-hover:text-primary-container transition-colors duration-200">{opp.title}</h3>
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">{opp.entity}</p>
          <p className="text-sm text-on-surface-variant font-medium mb-4">{opp.location} • {opp.date}</p>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(opp); }}
            className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-primary font-bold text-sm transition-all duration-300"
          >
            Modifica
          </button>
        </div>
      ))}
    </div>
  </motion.div>
);

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

const ImpactView = () => {
  const skillData = [
    { name: 'Cognitive', value: 400, color: '#5c3981' },
    { name: 'Sociali', value: 300, color: '#6a548c' },
    { name: 'Tecniche', value: 300, color: '#98001a' },
    { name: 'Digitali', value: 200, color: '#F04148' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <section>
        <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Impatto Territoriale</h2>
        <p className="text-on-surface-variant">Monitoraggio in tempo reale della crescita delle competenze sul territorio.</p>
        
        <div className="mt-6 space-y-2">
          <label className="font-roboto text-sm font-bold text-primary uppercase tracking-wider mb-2">Filtra per Periodo</label>
          <div className="relative">
            <select className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
              <option>Ultimi 30 giorni</option>
              <option>Ultimo Trimestre</option>
              <option>Anno Corrente</option>
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-on-surface-variant pointer-events-none w-5 h-5" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_4px_16px_rgba(117,81,155,0.1)] rounded-2xl p-6 border border-outline-variant/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-roboto text-xs font-bold text-on-surface-variant uppercase tracking-widest">Totale Skill</span>
              <div className="font-garamond text-3xl font-bold text-primary">1,284</div>
            </div>
          </div>
          <div className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full inline-block">
            +12% vs mese prec.
          </div>
        </div>

        <div className="bg-white shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_4px_16px_rgba(117,81,155,0.1)] rounded-2xl p-6 border border-outline-variant/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="font-roboto text-xs font-bold text-on-surface-variant uppercase tracking-widest">Totale Occupati</span>
              <div className="font-garamond text-3xl font-bold text-secondary">312</div>
            </div>
          </div>
          <div className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full inline-block">
            +8% vs mese prec.
          </div>
        </div>
      </section>

      <section className="bg-white shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_4px_16px_rgba(117,81,155,0.1)] rounded-2xl p-6 border border-outline-variant/20 transition-all duration-300">
        <h3 className="font-garamond text-xl font-bold text-primary mb-6">Distribuzione Tipologia Skill</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-white shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_4px_16px_rgba(117,81,155,0.1)] rounded-2xl p-6 border border-outline-variant/20 transition-all duration-300">
        <h3 className="font-garamond text-xl font-bold text-primary mb-6">Distribuzione per Centro</h3>
        <div className="space-y-5">
          {[
            { name: 'Novoli', value: 342, percentage: '85%', color: 'bg-primary' },
            { name: 'Isolotto', value: 215, percentage: '55%', color: 'bg-primary-container' },
            { name: 'Rifredi', value: 189, percentage: '45%', color: 'bg-secondary' },
            { name: 'Gavinana', value: 120, percentage: '30%', color: 'bg-outline-variant' },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between items-end mb-2">
                <span className="font-roboto text-sm font-bold">{item.name}</span>
                <span className="font-bold text-primary">{item.value}</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: item.percentage }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={cn("h-full rounded-full", item.color)} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const BackpackView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <section className="bg-white rounded-3xl p-7 shadow-[0_4px_16px_rgba(117,81,155,0.06)] hover:shadow-[0_8px_24px_rgba(117,81,155,0.1)] border border-outline-variant/20 relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
      <div className="relative flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
             <img 
              alt="Marco Bianchi" 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="font-garamond text-3xl font-bold text-primary">Il mio Backpack</h2>
          <p className="text-on-surface-variant font-medium">Identità Digitale & Competenze</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-primary hover:bg-primary-container text-white text-[11px] font-black uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow-[0_4px_12px_rgba(92,57,129,0.25)] hover:shadow-[0_6px_16px_rgba(92,57,129,0.35)] transition-all duration-300">
          <Plus className="w-5 h-5" />
          Valida Skill
        </button>
        <button className="bg-surface-container-high hover:bg-surface-container-highest text-primary text-[11px] font-black uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 border border-outline-variant/10 hover:border-primary/20">
          <CheckCircle2 className="w-5 h-5" />
          Valida Attività
        </button>
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-garamond text-xl font-bold text-primary">Attività Recenti</h3>
        <button className="text-secondary font-roboto text-xs font-bold uppercase tracking-widest">Cronologia</button>
      </div>
      <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-outline-variant/20 divide-y divide-outline-variant/15 overflow-hidden">
        {[
          { text: <>Hai aggiunto la skill <b>Digital Design</b></>, time: 'Oggi, 11:20', icon: PlusCircle, color: 'text-primary', bg: 'bg-primary/10' },
          { text: <>Nuova competenza validata: <b>Teamwork</b></>, time: 'Oggi, 09:12', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
          { text: <>Sbloccato livello 5 in <b>Social Impact</b></>, time: 'Ieri, 18:30', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((activity, idx) => (
          <div key={idx} className="p-5 flex gap-4 items-center group cursor-pointer hover:bg-surface-container-lowest/60 transition-all duration-200">
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110", activity.bg)}>
              <activity.icon className={cn("w-5 h-5", activity.color)} />
            </div>
            <div className="flex-1">
              <p className="font-roboto text-[13px] text-on-surface leading-snug">{activity.text}</p>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{activity.time}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-garamond text-xl font-bold text-primary">Attività Svolta</h3>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Project Management Lab', entity: 'Diaconia Firenze', date: 'Maggio 2024', type: 'Corso', status: 'Completato' },
          { title: 'Workshop Design Thinking', entity: 'Creative Studio', date: 'Aprile 2024', type: 'Workshop', status: 'Completato' }
        ].map((act, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-outline-variant/20 hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary">
                {act.type}
              </span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">{act.date}</span>
            </div>
            <h4 className="font-garamond text-lg font-bold text-primary mb-0.5">{act.title}</h4>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-4">{act.entity}</p>
            <button className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-primary hover:text-white text-primary font-black text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]">
              <MessageSquare className="w-3.5 h-3.5" />
              Lascia Feedback
            </button>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="font-garamond text-xl font-bold text-primary mb-4 px-1">Badge & Certificazioni</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Problem Solving', level: 'Esperto', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { title: 'Design Thinking', level: 'Intermedio', icon: Brain, color: 'text-pink-600', bg: 'bg-pink-50' },
        ].map((badge) => (
          <div key={badge.title} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center text-center group transition-all duration-300">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-300", badge.bg)}>
              <badge.icon className={cn("w-7 h-7", badge.color)} />
            </div>
            <p className="font-roboto text-sm font-bold text-on-surface leading-tight">{badge.title}</p>
            <span className={cn("text-[9px] uppercase font-black mt-2 px-2 py-0.5 rounded", badge.bg, badge.color)}>{badge.level}</span>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const StudentDashboard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <section>
      <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Ciao, Marco!</h2>
      <p className="text-on-surface-variant">Ecco le ultime novità e le opportunità per te oggi.</p>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-garamond text-xl font-bold text-primary">Opportunità Disponibili</h3>
        <button className="text-primary font-roboto text-sm font-bold">Vedi tutte</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Sviluppatore Frontend', location: 'TechNova Srl • Milano (Ibrido)', category: 'Offerta Lavoro', deadline: '2 gg fa', status: 'In revisione', statusIcon: Eye },
          { title: 'UI/UX Designer', location: 'CreativeStudio • Roma (Remoto)', category: 'Offerta Lavoro', deadline: 'Oggi', status: 'Colloquio programmato', statusIcon: Clock, statusColor: 'text-cta-red' },
        ].map((opp, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 rounded-md bg-secondary-container/30 text-secondary text-[10px] font-bold uppercase tracking-wider">{opp.category}</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">{opp.deadline}</span>
            </div>
            <h3 className="font-garamond text-lg font-bold text-primary mb-1 group-hover:text-primary-container transition-colors">{opp.title}</h3>
            <p className="text-sm text-on-surface-variant font-medium mb-4">{opp.location}</p>
            <div className={cn("flex items-center gap-2 text-xs font-bold", opp.statusColor || "text-on-surface-variant")}>
              <opp.statusIcon className="w-4 h-4" />
              <span>{opp.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-garamond text-xl font-bold text-primary">Attività Recenti</h3>
      </div>
      <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] divide-y divide-outline-variant/15 overflow-hidden">
        {[
          { text: <>Hai aggiunto la skill <b>Digital Design</b></>, time: 'Oggi, 11:20', icon: PlusCircle, iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
          { text: <>Lavoro accettato presso <b>Biblioteca Novoli</b></>, time: 'Ieri, 15:40', icon: Briefcase, iconBg: 'bg-secondary-container/30', iconColor: 'text-secondary' },
          { text: <>Hai aggiunto la skill <b>Public Speaking</b></>, time: '2 giorni fa', icon: Brain, iconBg: 'bg-tertiary-container/10', iconColor: 'text-tertiary' },
        ].map((activity, idx) => (
          <div key={idx} className="p-5 flex gap-4 items-start group hover:bg-surface-container-lowest/40 transition-all duration-200">
            <div className={cn("p-2.5 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-105", activity.iconBg)}>
              <activity.icon className={cn("w-5 h-5", activity.iconColor)} />
            </div>
            <div>
              <p className="font-roboto text-sm text-on-surface leading-snug">{activity.text}</p>
              <p className="text-[10px] text-on-surface-variant mt-1.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const StudentOpportunities = () => {
  const [filter, setFilter] = useState('Tutte');
  const [items, setItems] = useState([
    { id: 1, title: 'Sviluppatore Frontend', location: 'TechNova Srl • Milano (Ibrido)', deadline: '2 gg fa', category: 'Offerta Lavoro', status: 'In revisione', icon: Eye },
    { id: 2, title: 'React Patterns', location: 'Corso Avanzato • Certificato', deadline: '1 sett fa', category: 'Corso', status: 'In corso', icon: Clock },
    { id: 3, title: 'UI/UX Designer', location: 'CreativeStudio • Roma (Remoto)', deadline: 'Oggi', category: 'Offerta Lavoro', status: 'Colloquio programmato', icon: Clock, statusColor: 'text-cta-red' },
    { id: 4, title: 'Basi di Python', location: 'Coursera • Online', deadline: 'Mese scorso', category: 'Corso', status: 'Abbandonato', icon: XCircle },
  ]);
  const [workModes, setWorkModes] = useState([
  { label: 'Ibrido', checked: true },
  { label: 'Da Remoto', checked: true },
  { label: 'In Presenza', checked: false },
  ]);

  const [roles, setRoles] = useState(['Data Analyst', 'Machine Learning Engineer']);
  const [newRole, setNewRole] = useState('');
  const [showRoleInput, setShowRoleInput] = useState(false);

  const removeRole = (role: string) => {
    setRoles(roles.filter(r => r !== role));
  };

  const addRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, newRole.trim()]);
      setNewRole('');
      setShowRoleInput(false);
    }
  };

  const toggleWorkMode = (label: string) => {
    setWorkModes(workModes.map(m => m.label === label ? { ...m, checked: !m.checked } : m));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <section className="bg-white p-7 rounded-3xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_6px_16px_rgba(117,81,155,0.12)] border border-outline-variant/20 space-y-6 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-cta-red">
            <Briefcase className="w-6 h-6" />
            <h3 className="font-garamond text-2xl font-bold">Preferenze Lavorative</h3>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold text-primary mb-3">Ruoli Desiderati</p>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <button key={role} onClick={() => removeRole(role)} className="bg-[#2d1b4d] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 hover:bg-cta-red transition-colors">
                  {role}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {showRoleInput ? (
                <div className="flex items-center gap-1">
                  <input
                    autoFocus
                    value={newRole}
                    onChange={e => setNewRole(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addRole()}
                    placeholder="Nuovo ruolo..."
                    className="px-2 py-1 text-xs border border-primary rounded-lg outline-none w-32"
                  />
                  <button onClick={addRole} className="px-2 py-1 bg-primary text-white text-xs rounded-lg font-bold">OK</button>
                  <button onClick={() => setShowRoleInput(false)} className="px-2 py-1 text-xs text-on-surface-variant">✕</button>
                </div>
              ) : (
                <button onClick={() => setShowRoleInput(true)} className="px-3 py-1.5 rounded-lg border-2 border-dashed border-outline-variant text-[10px] font-black text-secondary uppercase tracking-tight">+ Aggiungi</button>
              )}
            </div>
          </div>

           <div>
              <p className="text-xs font-bold text-primary mb-3">Modalità di Lavoro</p>
              <div className="flex gap-4">
                {workModes.map(opt => (
                  <div key={opt.label} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleWorkMode(opt.label)}>
                     <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", opt.checked ? "bg-[#2d1b4d] border-[#2d1b4d]" : "border-outline-variant")}>
                       {opt.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                     </div>
                     <span className="text-xs font-medium text-on-surface-variant">{opt.label}</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>

      <section className="flex flex-col justify-between items-start px-1">
        <h2 className="font-garamond text-3xl font-bold text-primary">Le tue Opportunità</h2>
        <span className="text-on-surface-variant text-sm font-bold">{items.length} elementi</span>
      </section>

      <div className="flex gap-2 px-1 overflow-x-auto no-scrollbar pb-2">
        {['Tutte', 'Offerte di Lavoro', 'Corsi'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
              filter === f 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-hidden">
        <AnimatePresence>
          {items
            .filter(item => filter === 'Tutte' || item.category === filter)
            .map((opp) => (
              <motion.div 
                key={opp.id} 
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group"
              >
                {/* Background Action (Red X) */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-cta-red rounded-2xl flex items-center justify-center z-0">
                  <button 
                    onClick={() => removeItem(opp.id)}
                    className="p-3 text-white rounded-xl active:scale-90 transition-transform"
                  >
                    <XCircle className="w-8 h-8" />
                  </button>
                </div>

                {/* Draggable Foreground Card */}
                <motion.div 
                  drag="x"
                  dragConstraints={{ left: -100, right: 0 }}
                  dragElastic={0.1}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30 transition-all cursor-pointer relative z-10 touch-pan-y"
                  whileDrag={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-md bg-secondary-container/20 text-secondary text-[10px] font-black uppercase tracking-tight">{opp.category}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant">{opp.deadline}</span>
                  </div>
                  <h3 className="font-garamond text-2xl font-bold text-primary mb-1">{opp.title}</h3>
                  <p className="text-sm text-on-surface-variant font-medium mb-5">{opp.location}</p>
                  <div className={cn("flex items-center gap-2 pt-4 border-t border-outline-variant/20 text-xs font-bold", opp.statusColor || "text-on-surface-variant")}>
                    <opp.icon className="w-4 h-4" />
                    <span>{opp.status}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LanguagesView = () => {
  const [selected, setSelected] = useState('Italiano');
  const languages = [
    { name: 'Italiano', flag: '🇮🇹' },
    { name: 'English', flag: '🇬🇧' },
    { name: 'Français', flag: '🇫🇷' },
    { name: 'Deutsch', flag: '🇩🇪' },
    { name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <section>
        <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Lingua</h2>
        <p className="text-on-surface-variant font-medium">Seleziona la tua lingua preferita.</p>
      </section>

      <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-outline-variant/20 overflow-hidden divide-y divide-outline-variant/15 transition-all duration-300">
        {languages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => setSelected(lang.name)}
            className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-all duration-200 active:bg-primary/10 group"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <span className={cn(
                "font-roboto font-bold transition-colors",
                selected === lang.name ? "text-primary text-lg" : "text-on-surface-variant group-hover:text-on-surface"
              )}>
                {lang.name}
              </span>
            </div>
            {selected === lang.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white"
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const SettingsView = ({ onNavigate }: { onNavigate: (tab: Tab) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <section>
      <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Impostazioni</h2>
      <p className="text-on-surface-variant font-medium">Gestisci la tua sicurezza e le tue preferenze.</p>
    </section>

    <div className="bg-white p-7 rounded-3xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_6px_16px_rgba(117,81,155,0.12)] border border-outline-variant/20 space-y-6 transition-all duration-300">
      <div className="space-y-2">
         {[
           { label: 'Sicurezza e Password', icon: Lock, tab: null },
           { label: 'Privacy del Profilo', icon: Eye, tab: null },
           { label: 'Notifiche', icon: Bell, tab: null },
           { label: 'Lingua', icon: Languages, tab: 'languages' as Tab },
         ].map(item => (
           <div 
             key={item.label} 
             onClick={() => item.tab && onNavigate(item.tab)}
             className="flex items-center justify-between p-5 hover:bg-surface-container/60 rounded-2xl transition-all duration-200 cursor-pointer group border-b border-outline-variant/10 last:border-0"
           >
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                    <item.icon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />
                 </div>
                 <span className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface transition-colors duration-200">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors duration-300" />
           </div>
         ))}
      </div>
      
      <div className="pt-4">
        <button className="w-full py-4 bg-cta-red/10 hover:bg-cta-red/20 text-cta-red rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all duration-300 group">
           <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
           ELIMINA ACCOUNT
        </button>
      </div>
    </div>
  </motion.div>
);

const ManageProfileView = ({ role }: { role: Role }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <section>
      <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Gestisci Profilo</h2>
      <p className="text-on-surface-variant font-medium">Aggiorna le tue informazioni personali.</p>
    </section>

    <div className="bg-white p-7 rounded-3xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_6px_16px_rgba(117,81,155,0.12)] border border-outline-variant/20 space-y-6 transition-all duration-300">
      <div className="flex flex-col items-center mb-4">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container shadow-[0_4px_12px_rgba(92,57,129,0.15)] group-hover:shadow-[0_6px_16px_rgba(92,57,129,0.25)] group-hover:opacity-80 transition-all duration-300">
            <img 
              alt="Elena Rossi" 
              src={role === 'educator' 
                ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCpXWOajuEc7Ekc_6qR-pShByb9z4UXkyBuuxgAVsi2DoDlz3ealRaDmooBtjKc2d_3rF6c0oaIPoqEUgSyjYQfQvHzCMWZERWcyCX2_kZRFZwqpYGVS72Mfs9nYTOGHd-i3K8PfTvEN26w1IIdP8SkjviEgdcxfFrFd3DYIs_X227_xzzDGzXv9Reef_5f-8MerjD4uI-181pX0X1Xlt3TDp9vcoai7H6e_MSQ9KxFm8eg3YbHqUqb5k-MFmKbUwfK47BvFKu3kA"
                : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center text-white border-2 border-white shadow-[0_2px_8px_rgba(92,57,129,0.2)] group-hover:scale-110 transition-all duration-300">
            <Pencil className="w-4 h-4" />
          </div>
        </div>
        <h3 className="mt-5 font-garamond text-2xl font-bold text-on-surface">{role === 'educator' ? 'Elena Rossi' : 'Marco Bianchi'}</h3>
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">{role === 'educator' ? 'Educatore' : 'Studente'}</p>
      </div>

      <div className="space-y-2">
         {[
           { label: 'E-mail', value: role === 'educator' ? 'rossi.educatore@scuola.it' : 'marco.bianchi@gmail.com' },
           { label: 'Sede/Indirizzo', value: role === 'educator' ? 'Centro Novoli, Firenze' : 'Via Festa del Perdono 7, 20122 Milano' },
           { label: 'Istituto', value: role === 'educator' ? 'I.I.S. Marconi' : 'Università di Milano' },
           { label: 'Telefono', value: '+39 345 678 9012' },
         ].map(item => (
           <div key={item.label} className="flex items-center justify-between p-5 bg-surface-container/30 hover:bg-surface-container/50 rounded-2xl border border-outline-variant/10 transition-all duration-200 group">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">{item.label}</p>
                <p className="font-roboto text-sm font-bold text-on-surface mt-1 truncate">{item.value}</p>
              </div>
              <button className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-xl text-primary transition-all duration-300 active:scale-90 shrink-0">
                <Pencil className="w-4 h-4" />
              </button>
           </div>
         ))}
      </div>
    </div>
  </motion.div>
);

const EducatorDashboard = ({ onStartValidation, onSelectPending }: { onStartValidation: () => void, onSelectPending: (item: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <section>
      <h2 className="font-garamond text-3xl font-bold text-primary mb-2">Benvenuta, Elena Rossi</h2>
      <p className="text-on-surface-variant font-medium">Gestisci le competenze e i progressi dei tuoi studenti.</p>
    </section>
    
    <div className="bg-white p-7 rounded-3xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_6px_16px_rgba(117,81,155,0.12)] border border-outline-variant/20 space-y-5 relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
      
      <div className="flex items-center gap-3 text-primary mb-1">
        <ShieldCheck className="w-6 h-6" />
        <h3 className="font-garamond text-xl font-bold tracking-tight">Centro Validazioni</h3>
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={onStartValidation}
          className="w-full flex items-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/8 border border-primary/15 hover:border-primary/30 transition-all duration-300 group active:scale-95 text-left gap-6"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_4px_12px_rgba(92,57,129,0.25)] group-hover:shadow-[0_6px_16px_rgba(92,57,129,0.35)] transition-all duration-300 group-hover:scale-110 shrink-0">
            <FilePlus className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-black uppercase text-primary tracking-widest block mb-1">Validazione Manuale</span>
            <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">Certifica competenze maturate in contesti formali e informali.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>

    <section>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
        <input 
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]" 
          placeholder="Cerca uno studente..." 
          type="text"
        />
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-garamond text-xl font-bold text-primary">Validazioni Pendenti</h3>
        <button className="text-primary font-roboto text-sm font-bold">Vedi tutti</button>
      </div>
      <div className="space-y-3">
        {[
          { id: 1, name: 'Marco Bianchi', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', skill: 'Coding Base: JavaScript', school: 'I.I.S. Marconi', institution: 'Centro Novoli', time: '2 ore fa', icon: BookOpen, color: 'bg-primary/10', skills: ['JavaScript', 'Logic'] },
          { id: 2, name: 'Sofia Esposito', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', skill: 'Design Thinking: Prototipazione', school: 'Liceo Artistico', institution: 'Creative Studio', time: '5 ore fa', icon: Palette, color: 'bg-secondary/10', skills: ['Prototyping', 'User Research'] },
          { id: 3, name: 'Luca Ferrari', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', skill: 'Public Speaking: Pitching', school: 'Università di Milano', institution: 'Teatro Rifredi', time: '8 ore fa', icon: MessageSquare, color: 'bg-tertiary/10', skills: ['Dizione', 'Presentazione'] },
        ].map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => onSelectPending(item)}
            className="w-full flex items-center p-5 bg-white border border-outline-variant/20 hover:border-primary/30 rounded-2xl gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all duration-300 text-left group"
          >
            <div className={cn("w-12 h-12 rounded-xl overflow-hidden shrink-0 transition-all duration-300 group-hover:scale-110", item.color)}>
              <img src={item.avatar} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-roboto text-base font-bold text-on-surface truncate">{item.name}</div>
              <div className="text-on-surface-variant text-sm font-medium truncate mb-1">{item.skill}</div>
              <div className="flex items-center gap-2">
                <span className="bg-surface-container-high px-2 py-0.5 rounded text-[10px] font-bold text-primary uppercase tracking-wider">{item.school}</span>
                <span className="text-[10px] text-outline font-medium">{item.time}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-garamond text-xl font-bold text-primary">Attività Recente</h3>
        <button className="text-primary font-roboto text-sm font-bold">Vedi tutte</button>
      </div>
      <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] divide-y divide-outline-variant/15 overflow-hidden">
        {[
          { text: <><b>Luca Ferrari</b> ha ottenuto il badge <b>Public Speaking</b></>, time: 'Oggi, 10:30', icon: CheckCircle2, iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
          { text: <><b>Elena Verdi</b> ha iniziato a lavorare presso <b>Tech Solutions</b></>, time: 'Ieri, 17:45', icon: Briefcase, iconBg: 'bg-secondary-container/30', iconColor: 'text-secondary' },
          { text: <><b>Marco Bianchi</b> ha completato il corso <b>JavaScript Avanzato</b></>, time: '2 giorni fa', icon: BookOpen, iconBg: 'bg-surface-container-highest', iconColor: 'text-on-surface-variant' },
        ].map((activity, idx) => (
          <div key={idx} className="p-5 flex gap-4 items-start group hover:bg-surface-container-lowest/40 transition-all duration-200">
            <div className={cn("p-2.5 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-105", activity.iconBg)}>
              <activity.icon className={cn("w-5 h-5", activity.iconColor)} />
            </div>
            <div>
              <p className="font-roboto text-sm text-on-surface leading-snug">{activity.text}</p>
              <p className="text-[10px] text-on-surface-variant mt-1.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const ProfileView = ({ role, onNavigate }: { role: Role, onNavigate: (tab: Tab) => void }) => {
  if (role === 'educator') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8"
      >
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_8px_rgba(117,81,155,0.05)] hover:shadow-[0_6px_16px_rgba(117,81,155,0.12)] border border-outline-variant/20 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
          
          <button 
            onClick={() => onNavigate('settings')}
            className="absolute top-4 left-4 p-2 text-on-surface-variant hover:text-primary transition-colors active:scale-90 z-10"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-surface shadow-xl -rotate-2 group hover:rotate-0 transition-transform duration-500">
              <img 
                alt="Elena Rossi" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpXWOajuEc7Ekc_6qR-pShByb9z4UXkyBuuxgAVsi2DoDlz3ealRaDmooBtjKc2d_3rF6c0oaIPoqEUgSyjYQfQvHzCMWZERWcyCX2_kZRFZwqpYGVS72Mfs9nYTOGHd-i3K8PfTvEN26w1IIdP8SkjviEgdcxfFrFd3DYIs_X227_xzzDGzXv9Reef_5f-8MerjD4uI-181pX0X1Xlt3TDp9vcoai7H6e_MSQ9KxFm8eg3YbHqUqb5k-MFmKbUwfK47BvFKu3kA"
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => onNavigate('manage-profile')}
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-white border-4 border-surface shadow-lg flex items-center justify-center hover:bg-primary-container active:scale-90 transition-all z-20"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <h2 className="font-garamond text-3xl font-bold text-primary mb-1">Elena Rossi</h2>
          <p className="text-on-surface-variant font-medium text-sm mb-4">Educatore Supervisore Accreditato</p>
          <div className="px-4 py-1.5 rounded-full bg-secondary-container/30 text-on-secondary-container text-xs font-bold flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            I.I.S. Marconi
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-outline-variant/20 space-y-5 transition-all duration-300">
          <h3 className="font-garamond text-xl font-bold text-primary mb-2">Informazioni Account</h3>
          <div className="space-y-4">
            {[
              { label: 'E-mail', value: 'rossi.educatore@scuola.it', icon: MessageSquare },
              { label: 'Sede', value: 'Centro Novoli, Firenze', icon: Search },
              { label: 'Istituto', value: 'I.I.S. Marconi', icon: GraduationCap },
              { label: 'Iscritto dal', value: '12 Gennaio 2024', icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                   <item.icon className="w-5 h-5 text-primary opacity-70" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{item.label}</p>
                  <p className="font-roboto text-sm font-bold text-on-surface">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
        
        <button 
          onClick={() => onNavigate('settings')}
          className="absolute top-4 left-4 p-2 text-on-surface-variant hover:text-primary transition-colors active:scale-90 z-10"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-surface shadow-xl -rotate-2 group hover:rotate-0 transition-transform duration-500">
            <img 
              alt="Marco Bianchi" 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => onNavigate('manage-profile')}
            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-white border-4 border-surface shadow-lg flex items-center justify-center hover:bg-primary-container active:scale-90 transition-all z-20"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <h2 className="font-garamond text-3xl font-bold text-primary mb-1">Marco Bianchi</h2>
        <p className="text-on-surface-variant font-medium text-sm mb-4">Studente Magistrale in Data Science</p>
        <div className="px-4 py-1.5 rounded-full bg-secondary-container/30 text-on-secondary-container text-xs font-bold flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Università di Milano
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-outline-variant/20 space-y-6 text-left">
          <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
            Il tuo profilo è completo all'85%. Condividi le tue competenze o genera un curriculum digitale ottimizzato per il tuo percorso in Data Science.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('cv-preview')}
              className="w-full py-5 bg-cta-red hover:bg-cta-red/90 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-[0_8px_20px_rgba(240,65,72,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5" />
              PREVIEW CV DIGITALE
            </button>
            <button className="w-full py-5 bg-white border-2 border-outline-variant hover:border-primary/30 text-primary rounded-[2rem] font-black text-xs uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <Share2 className="w-5 h-5" />
              CONDIVIDI CV DIGITALE
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-outline-variant/20 space-y-6 text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-garamond text-2xl font-bold text-primary">Personalizza CV Digitale</h3>
            <Pencil className="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
          </div>

          <div className="space-y-4">
            <div className="bg-[#f9f5ff] p-5 rounded-3xl flex items-center gap-5 group cursor-pointer hover:bg-primary/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#ece4f9] flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-on-surface text-sm">Video di Presentazione</h4>
                <p className="text-[10px] text-on-surface-variant truncate opacity-60">https://www.youtube.com/embed/dQw4w9WgXcQ</p>
              </div>
            </div>

            <div className="bg-[#f9f5ff] p-5 rounded-3xl flex items-center gap-5 group cursor-pointer hover:bg-primary/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#ece4f9] flex items-center justify-center shrink-0">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-on-surface text-sm">Esperienze Professionali</h4>
                <p className="text-[10px] text-on-surface-variant opacity-60">2 esperienze caricate</p>
              </div>
            </div>

            <div className="bg-[#f9f5ff] p-5 rounded-3xl flex items-center gap-5 group cursor-pointer hover:bg-primary/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#f8edf0] flex items-center justify-center shrink-0">
                <UsersRound className="w-7 h-7 text-cta-red" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-on-surface text-sm">Certificati & Badge</h4>
                <p className="text-[10px] text-on-surface-variant opacity-60">3 competenze verificate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DigitalCVPreview = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (tab: Tab) => void }) => {
  const verifiedSkills = [
    {
      title: 'Manutenzione del Verde',
      type: 'ATTESTATO',
      description: 'Cura di parchi e giardini pubblici, utilizzo sicuro di attrezzature professionali, semina e potatura stagionale.',
      icon: <Brain className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
      tagColor: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Supporto Logistico',
      type: 'ESPERIENZA PRATICA',
      description: 'Organizzazione magazzino, carico/scarico merci, e supporto pratico per eventi di quartiere e iniziative sociali.',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      tagColor: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Collaborazione e Supporto',
      type: 'SOFT SKILL',
      description: 'Capacità di lavorare bene con persone di diverse età e background. Affidabilità, ascolto attivo e spirito di iniziativa in contesti di gruppo.',
      icon: <UsersRound className="w-6 h-6 text-cta-red" />,
      bg: 'bg-rose-50',
      tagColor: 'bg-rose-50 text-cta-red border-rose-200'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10 pb-20 pt-4"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-outline-variant/20 flex items-center justify-center text-primary active:scale-90 transition-all"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <button className="bg-[#5c3981] text-white px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all">
          <Download className="w-4 h-4" />
          SCARICA CV PDF
        </button>
      </div>

      {/* User Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl">
            <img 
              alt="Marco Bianchi" 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="font-garamond text-4xl font-bold text-primary mb-2">Marco Bianchi</h1>
        <p className="text-on-surface-variant font-medium text-base mb-8">Digital Designer & Data Science Student</p>
        
        <p className="text-on-surface-variant font-medium text-[15px] leading-relaxed max-w-[340px] px-2 italic">
          "Appassionato di tecnologia e analisi dei dati. Ho maturato esperienza nella gestione di database complessi e nello sviluppo di interfacce digitali intuitive. Imparo in fretta, amo collaborare in team multidisciplinari e metto estrema cura nella visualizzazione dei dati per l'impatto territoriale."
        </p>
      </div>

      {/* Video Presentation */}
      <section className="space-y-6">
        <h2 className="font-garamond text-2xl font-bold text-primary">Video Presentazione</h2>
        <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl aspect-video border-[4px] border-white ring-1 ring-outline-variant/10">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
             <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-10 h-10 text-primary translate-x-1" strokeWidth={2.5} />
             </div>
          </div>
        </div>
      </section>

      {/* Verified Skills */}
      <section className="space-y-6">
        <h2 className="font-garamond text-2xl font-bold text-primary">Competenze ed Esperienze Verificate</h2>
        <div className="space-y-6">
          {verifiedSkills.map((skill, idx) => (
            <div key={idx} className="bg-white p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-outline-variant/20 relative group hover:border-primary/20 transition-all duration-300">
              <div className="flex gap-6">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", skill.bg)}>
                  {skill.icon}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-garamond text-[22px] font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">{skill.title}</h3>
                    <div className={cn("px-2 py-0.5 rounded-md border text-[9px] font-black w-fit uppercase tracking-wider flex items-center gap-1", skill.tagColor)}>
                      {skill.type === 'ATTESTATO' && <ShieldCheck className="w-3 h-3" />}
                      {skill.type === 'ESPERIENZA PRATICA' && <CheckCircle2 className="w-3 h-3" />}
                      {skill.type === 'SOFT SKILL' && <CheckCircle2 className="w-3 h-3" />}
                      {skill.type}
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-[13px] leading-relaxed font-normal">
                    {skill.description}
                  </p>
                  <button 
                    onClick={() => onNavigate('skill-verification')}
                    className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest pt-2 group-hover:translate-x-1 transition-transform"
                  >
                    VERIFICA COMPETENZA <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const SkillVerificationDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 pb-20 pt-4"
    >
      <div className="flex justify-start">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-outline-variant/20 flex items-center justify-center text-primary active:scale-90 transition-all font-bold"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
      </div>

      {/* Certificate Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[3rem] -z-10 group-hover:bg-primary/10 transition-colors" />
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-outline-variant/20">
          <div className="h-2 bg-gradient-to-r from-primary via-cta-red to-primary" />
          <div className="p-10 text-center space-y-8 relative">
            {/* Background Icon */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <UsersRound className="w-32 h-32 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                DIACONIA VALDESE FIORENTINA | PATH ID: FW6LQB
              </p>
              <h2 className="font-garamond text-xl font-bold text-primary uppercase tracking-widest">
                SI ATTESTA CHE
              </h2>
            </div>

            <h1 className="font-garamond text-5xl font-bold text-primary">Marco Bianchi</h1>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                HA OTTENUTO LA COMPETENZA IN
              </p>
              <h3 className="font-garamond text-4xl font-bold text-primary max-w-[280px] mx-auto leading-tight">
                Manutenzione del Verde
              </h3>
            </div>

            <div className="pt-6 border-t border-dashed border-outline-variant/30">
              <p className="text-xs font-medium text-on-surface-variant/80">
                Data di emissione: <span className="font-bold">12 APRILE 2024</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button className="w-full py-5 bg-[#5c3981] hover:bg-[#4a2e68] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <Download className="w-5 h-5" />
          SCARICA CERTIFICATO PDF
        </button>
        <button className="w-full py-5 bg-white border-2 border-outline-variant hover:border-primary/20 text-primary rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <Share2 className="w-5 h-5" />
          CONDIVIDI TRAGUARDO
        </button>
      </div>

      {/* Issuer Info */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-outline-variant/10 space-y-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner shrink-0">
            <UsersRound className="w-10 h-10" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">RILASCIATO DA</p>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
              <h4 className="font-garamond text-2xl font-bold text-primary leading-tight">Diaconia Valdese Fiorentina</h4>
              <div className="bg-[#f0f9f4] text-[#1a8a4d] border border-[#d1efdb] px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                VERIFICATO
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-on-surface-variant/80 leading-relaxed font-medium">
          La Diaconia Valdese Fiorentina è un ente non profit che opera nell'area sociale e formativa sul territorio fiorentino, promuovendo percorsi di inclusione e crescita professionale.
        </p>

        <button className="w-full py-3.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
          Profilo Emittente
        </button>
      </div>

      {/* Activity Description */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-outline-variant/10 space-y-4">
        <h3 className="font-garamond text-2xl font-bold text-primary">Descrizione dell'attività</h3>
        <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
          Il percorso formativo ha fornito le competenze tecniche necessarie per la manutenzione ordinaria e straordinaria del verde urbano. Marco ha dimostrato eccellenti capacità operative nell'uso delle attrezzature e una profonda sensibilità verso la sostenibilità ambientale e la cura del bene comune.
        </p>
      </div>
    </motion.div>
  );
};

const ValidationFlow = ({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  
  const students = [
    { id: 1, name: 'Marco Bianchi', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Sofia Esposito', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Luca Ferrari', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
  ];

  const skills = [
    { id: 1, name: 'Problem Solving Strategico', cat: 'Trasversali' },
    { id: 2, name: 'Comunicazione non verbale', cat: 'Sociali' },
    { id: 3, name: 'Pensiero Critico', cat: 'Trasversali' },
    { id: 4, name: 'Gestione del Conflitto', cat: 'Sociali' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center px-0 sm:px-4"
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-surface shadow-2xl h-[92vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[32px] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
          <div>
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Passaggio {step} di 3</span>
            <h2 className="font-garamond text-2xl font-bold text-primary">Validazione Manuale</h2>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <XCircle className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Seleziona lo Studente</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                    placeholder="Cerca per nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map(s => (
                  <button 
                    key={s.id} 
                    onClick={() => setStep(2)}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all text-left"
                  >
                    <img src={s.avatar} className="w-12 h-12 rounded-full object-cover border border-outline-variant" alt="" />
                    <span className="font-roboto font-bold text-on-surface flex-1">{s.name}</span>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Seleziona la Competenza</label>
                <div className="grid grid-cols-1 gap-3">
                  {skills.map(skill => (
                    <button 
                      key={skill.id} 
                      onClick={() => setStep(3)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-outline-variant bg-surface hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div>
                        <p className="font-roboto font-bold text-on-surface">{skill.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium uppercase">{skill.cat}</p>
                      </div>
                      <Plus className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-10">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto scale-125">
                  <ShieldCheck className="w-16 h-16 text-primary" />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center text-white"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="font-garamond text-3xl font-bold text-primary">Pronto per Conferma</h3>
                <p className="text-on-surface-variant max-w-xs mx-auto text-sm font-medium leading-relaxed">
                  Stai validando la competenza <b>Problem Solving Strategico</b> per lo studente <b>Marco Bianchi</b>.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <button 
                  onClick={onComplete}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all"
                >
                  CONFERMA VALIDAZIONE
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full py-4 text-on-surface-variant font-bold text-sm hover:text-primary transition-colors"
                >
                  Torna all'inizio
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const OpportunityFlow = ({ onComplete, onCancel, onDelete, initialData }: { 
  onComplete: (item: any) => void, 
  onCancel: () => void, 
  onDelete?: (id: number) => void,
  initialData?: any 
}) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    type: 'Corso',
    entity: '',
    location: '',
    date: '',
    description: '',
    skills: '',
    audience: 'all',
    students: 0
  });

  const types = ['Colloquio', 'Stage', 'Corso'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center px-0 sm:px-4"
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-surface shadow-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-[40px] sm:rounded-[32px] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
          <div>
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">{initialData ? 'Modifica' : 'Nuova'} Opportunità</span>
            <h2 className="font-garamond text-2xl font-bold text-primary">{initialData ? 'Aggiorna Dettagli' : 'Crea opportunità'}</h2>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <XCircle className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Tipo Opportunità</label>
              <div className="flex gap-2">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={cn(
                      "flex-1 py-3 rounded-xl border-2 text-[11px] font-black uppercase tracking-tight transition-all",
                      formData.type === t 
                        ? "bg-primary/5 border-primary text-primary" 
                        : "bg-surface border-outline-variant/30 text-on-surface-variant hover:border-primary/20"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Titolo dell'opportunità</label>
              <input 
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface font-bold text-on-surface"
                placeholder="es. Workshop Coding Avanzato"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Ente / Azienda</label>
                <div className="relative">
                   <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                   <input 
                    value={formData.entity}
                    onChange={e => setFormData({ ...formData, entity: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                    placeholder="Nome realtà"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Data Inizio</label>
                <div className="relative">
                   <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                   <input 
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                    placeholder="es. 12 Giugno 2024"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Sede / Indirizzo</label>
              <div className="relative">
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                 <input 
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                  placeholder="Dove si svolge?"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Descrizione Breve</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface resize-none"
                placeholder="Spiega di cosa si tratta..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Skill Acquisibili (separate da virgola)</label>
              <div className="relative">
                 <Palette className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                 <input 
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                  placeholder="es. React, Design Thinking, Teamwork"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider pl-1">Destinatari</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, audience: 'all' })}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                    formData.audience === 'all' || !formData.audience
                      ? "bg-primary/5 border-primary text-primary"
                      : "bg-surface border-outline-variant/30 text-on-surface-variant"
                  )}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">Tutti</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, audience: 'specific' })}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                    formData.audience === 'specific'
                      ? "bg-primary/5 border-primary text-primary"
                      : "bg-surface border-outline-variant/30 text-on-surface-variant"
                  )}
                >
                  <UserRound className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-tight">Seleziona partecipanti</span>
                </button>
              </div>

              {formData.audience === 'specific' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                    <input 
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none text-sm transition-all bg-surface"
                      placeholder="Cerca..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Marco Bianchi', 'Sofia Esposito'].map(s => (
                      <span key={s} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-primary/10">
                        {s}
                        <X className="w-3 h-3 cursor-pointer" />
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button 
              onClick={() => onComplete(formData)}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              {initialData ? 'SALVA MODIFICHE' : 'PUBBLICA OPPORTUNITÀ'}
            </button>

            {initialData && onDelete && (
              <button 
                onClick={() => onDelete(initialData.id)}
                className="w-full py-4 bg-cta-red/10 hover:bg-cta-red/20 text-cta-red rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all duration-300 group"
              >
                <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                ELIMINA OPPORTUNITÀ
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PendingValidationDetail = ({ item, onApprove, onReject, onClose }: { item: any, onApprove: () => void, onReject: () => void, onClose: () => void }) => {
  if (!item) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-on-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center px-4"
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-surface shadow-2xl h-[92vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[32px] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
          <h2 className="font-garamond text-2xl font-bold text-primary">Dettaglio Validazione</h2>
          <button onClick={onClose} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <XCircle className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mx-auto shadow-lg">
              <img 
                src={item.avatar} 
                className="w-full h-full object-cover" 
                alt="" 
              />
            </div>
            <div>
              <h3 className="font-garamond text-3xl font-bold text-on-surface">{item.name}</h3>
              <p className="text-xs font-black uppercase text-primary tracking-[0.2em]">{item.school}</p>
            </div>
          </section>

          <div className="space-y-6">
            <div className="bg-surface-container/30 p-5 rounded-2xl border border-outline-variant/10 space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Corso Frequentato</p>
                <p className="font-roboto font-bold text-primary text-lg">{item.skill}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Presso / Ente</p>
                  <p className="font-roboto font-bold text-sm">{item.institution}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Data Richiesta</p>
                  <p className="font-roboto font-bold text-sm">Oggi, {item.time}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-3 pl-1">Competenze Acquisite</p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill: string) => (
                  <span key={skill} className="bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10 text-xs font-black uppercase tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button 
              onClick={onApprove}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              VALIDA COMPETENZA
            </button>
            <button 
              onClick={onReject}
              className="w-full py-4 bg-cta-red/10 text-cta-red rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <XCircle className="w-5 h-5" />
              RIFIUTA
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [role, setRole] = useState<Role>('educator');

  // Flow State
  const [showValidation, setShowValidation] = useState(false);
  const [selectedPending, setSelectedPending] = useState<any>(null);
  
  // Opportunities State
  const [showOpportunityFlow, setShowOpportunityFlow] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<any>(null);
  const [opportunities, setOpportunities] = useState([
    { id: 1, title: 'Project Management Lab', location: 'Centro Novoli', date: 'Dal 20 Maggio', category: 'Professional', students: 12, type: 'Corso', entity: 'Diaconia Firenze', description: 'Laboratorio sulle metodologie agili.', skills: 'Agile, Scrum' },
    { id: 2, title: 'Workshop Design Thinking', location: 'Isolotto', date: '15 Giugno', category: 'Creativity', students: 8, type: 'Stage', entity: 'Creative Studio', description: 'Workshop pratico di prototipazione.', skills: 'Prototyping, UX' },
    { id: 3, title: 'Coding Bootcamp', location: 'Rifredi', date: 'Settembre 2024', category: 'Tech', students: 25, type: 'Corso', entity: 'Tech Academy', description: 'Percorso intensivo su JavaScript e React.', skills: 'React, TypeScript' },
  ]);

  const handleLogin = (chosenRole: Role) => {
    setRole(chosenRole);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSaveOpportunity = (data: any) => {
    if (editingOpportunity) {
      setOpportunities(opportunities.map(o => o.id === editingOpportunity.id ? { ...data, id: o.id } : o));
    } else {
      setOpportunities([...opportunities, { ...data, id: Date.now(), students: 0 }]);
    }
    setShowOpportunityFlow(false);
    setEditingOpportunity(null);
  };

  const handleDeleteOpportunity = (id: number) => {
    setOpportunities(opportunities.filter(o => o.id !== id));
    setShowOpportunityFlow(false);
    setEditingOpportunity(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return role === 'educator' 
        ? <EducatorDashboard 
            onStartValidation={() => setShowValidation(true)} 
            onSelectPending={(item) => setSelectedPending(item)}
          /> 
        : <StudentDashboard />;
      case 'backpack': return <BackpackView />;
      case 'profile': return <ProfileView role={role} onNavigate={setActiveTab} />;
      case 'opportunities': return role === 'educator' 
        ? <OpportunityView 
            opportunities={opportunities} 
            onCreate={() => { setEditingOpportunity(null); setShowOpportunityFlow(true); }}
            onEdit={(opp) => { setEditingOpportunity(opp); setShowOpportunityFlow(true); }}
          /> 
        : <StudentOpportunities />;
      case 'impact': return <ImpactView />;
      case 'settings': return <SettingsView onNavigate={setActiveTab} />;
      case 'manage-profile': return <ManageProfileView role={role} />;
      case 'cv-preview': return <DigitalCVPreview onBack={() => setActiveTab('profile')} onNavigate={setActiveTab} />;
      case 'skill-verification': return <SkillVerificationDetail onBack={() => setActiveTab('cv-preview')} />;
      case 'languages': return <LanguagesView />;
      default: return role === 'educator' 
        ? <EducatorDashboard 
            onStartValidation={() => setShowValidation(true)} 
            onSelectPending={(item) => setSelectedPending(item)}
          /> 
        : <StudentDashboard />;
    }
  };

  const navItems = role === 'educator' ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'impact', label: 'Impact', icon: BarChart3 },
    { id: 'opportunities', label: 'Opportunità', icon: GraduationCap },
    { id: 'profile', label: 'Profilo', icon: User },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'backpack', label: 'Backpack', icon: Backpack },
    { id: 'opportunities', label: 'Opportunità', icon: GraduationCap },
    { id: 'profile', label: 'Profilo', icon: User },
  ];

  const isFullScreenTab = activeTab === 'cv-preview' || activeTab === 'skill-verification';

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className={cn("min-h-screen selection:bg-primary-container/30", isFullScreenTab ? "bg-[#fdf8ff]" : "bg-surface")}>
      {!isFullScreenTab && <TopAppBar role={role} onLogout={handleLogout} />}

      <main className={cn("max-w-md mx-auto px-5", !isFullScreenTab ? "pt-24 pb-32" : "pt-8 pb-12")}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${role}-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showValidation && (
            <ValidationFlow 
              onComplete={() => setShowValidation(false)} 
              onCancel={() => setShowValidation(false)} 
            />
          )}
          {selectedPending && (
            <PendingValidationDetail 
              item={selectedPending}
              onClose={() => setSelectedPending(null)}
              onApprove={() => setSelectedPending(null)}
              onReject={() => setSelectedPending(null)}
            />
          )}
          {showOpportunityFlow && (
            <OpportunityFlow 
              initialData={editingOpportunity}
              onComplete={handleSaveOpportunity}
              onDelete={handleDeleteOpportunity}
              onCancel={() => { setShowOpportunityFlow(false); setEditingOpportunity(null); }}
            />
          )}
        </AnimatePresence>
      </main>

      {!isFullScreenTab && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-3 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative px-2",
                activeTab === tab.id ? "text-primary" : "text-on-surface-variant hover:text-primary/70"
              )}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabBg"
                  className="absolute inset-x-[-10px] inset-y-[-4px] bg-secondary-container/40 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon className={cn("w-6 h-6 mb-1 transition-transform", activeTab === tab.id ? "scale-110" : "scale-100")} />
              <span className="font-roboto text-[9px] font-bold uppercase tracking-tight">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}