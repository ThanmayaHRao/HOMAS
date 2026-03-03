import GlassIcons from '../components/GlassIcons';
import { FiUsers, FiUserCheck, FiGrid, FiCalendar, FiShield } from 'react-icons/fi';

const items = [
  { icon: <FiUsers size={38} />,     color: 'blue',   label: 'Patients',     page: 'patients' },
  { icon: <FiUserCheck size={38} />, color: 'purple', label: 'Doctors',      page: 'doctors' },
  { icon: <FiGrid size={38} />,      color: 'indigo', label: 'Departments',  page: 'departments' },
  { icon: <FiCalendar size={38} />,  color: 'green',  label: 'Appointments', page: 'appointments' },
  { icon: <FiShield size={38} />,    color: 'orange', label: 'Insurance',    page: 'insurance' },
];

export default function Dashboard({ navigate, onLogout }) {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020008', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');
      `}</style>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '3rem', color: '#f5faf4', marginBottom:8, letterSpacing: '0.1em' }}>
        HOMAS
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'white', letterSpacing: '0.1em', marginBottom: 60 }}>
        SELECT A SERVICE
      </p>

      <GlassIcons
        items={items.map(item => ({
          ...item,
          // wrap onClick into each item
          customClass: 'homas-icon',
        }))}
        className="!grid-cols-5"
      />

      <button
        onClick={onLogout}
        style={{
          marginTop: 80, background: 'none',
          border: '1px solid white', borderRadius: 8,
          padding: '8px 20px', color:'white' ,
          fontSize: 11, fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}