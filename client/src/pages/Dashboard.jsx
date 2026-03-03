import Topbar from '../components/Topbar'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { Users, Stethoscope, Building2, CalendarClock, CloudFog } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import api from '../api/api'

export default function Dashboard() {

  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [appointments, setAppointments] = useState([])
  const [insurances, setInsurances] = useState([])
  const [loading, setLoading] = useState(true)

  const insuredCount = useMemo(()=>{
    return patients.length - insurances.filter(i => i.patientId).length;
  },[patients, insurances])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, dRes, deptRes,insurance, aRes] = await Promise.all([
          api.get('/patients'),
          api.get('/doctors'),
          api.get('/departments'),
          api.get('/insurance'),
          api.get('/appointments')
        ])
        setInsurances(insurance.data || [])
        // Patients & Appointments are paginated
        setPatients(pRes.data.content || [])
        setAppointments(aRes.data.content || [])

        setDoctors(dRes.data || [])
        setDepartments(deptRes.data || [])

      } catch (error) {
        console.error('Dashboard load error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  useEffect(()=>{
    console.log(doctors)
  },[insuredCount])
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  const recentAppts = [...appointments].slice(-3).reverse()
  
  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar title="Dashboard" subtitle="Overview of Hospital Operations" />

      <main className="p-8 space-y-8">

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard label="Patients" value={patients.length} icon={Users} sub="Registered" />
          <StatCard label="Doctors" value={doctors.length} icon={Stethoscope} sub="Active staff" />
          <StatCard label="Departments" value={departments.length} icon={Building2} sub="Operational" />
          <StatCard label="Appointments" value={appointments.length} icon={CalendarClock} sub="Scheduled" />
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Recent Appointments */}
          <div className="col-span-2 border border-gray-200 rounded shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-widest">
                Recent Appointments
              </h3>
              <CalendarClock size={16} className="text-gray-400" />
            </div>

            {recentAppts.length === 0 ? (
              <p className="p-6 text-center text-gray-400">
                No appointments yet
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentAppts.map((a) => (
                  <div
                    key={a.id}
                    className="px-5 py-4 flex justify-between hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-semibold text-black">
                        {a.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {a.reason}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(a.appointmentTime).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-medium text-black">
                        {a.doctorName}
                      </p>
                      <Badge variant="muted">
                        Doctor ID: {a.doctorId}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Departments Section */}
          {/* Departments Section */}
<div className="border border-gray-200 rounded shadow-sm">
  <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
    <h3 className="text-sm font-semibold uppercase tracking-widest">
      Departments
    </h3>
    <Building2 size={16} className="text-gray-400" />
  </div>

  <div className="divide-y divide-gray-100">
    {departments.map((d) => {

      const deptDoctors = doctors.filter(
        (doc) =>
          doc.departmentName?.toLowerCase() ===
          d.name?.toLowerCase()
      )

      return (
        <div
          key={d.id}
          className="px-5 py-3 flex justify-between hover:bg-gray-50 transition"
        >
          <div>
            <p className="font-medium text-black">
              {d.name}
            </p>
            <p className="text-xs text-gray-500">
              {d.headDoctor ?? '—'}
            </p>
          </div>

          <Badge variant="outline">
            {deptDoctors.length} docs
          </Badge>
        </div>
      )
    })}
  </div>
</div>

        </div>

        {/* Insurance Coverage */}
        <div className="border border-gray-200 rounded shadow-sm p-5">
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">
            Insurance Coverage
          </h3>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-black">
                {patients.length - insuredCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Patients insured
              </p>
            </div>

            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div
                className="bg-black h-3 rounded-full transitfion-all duration-500"
                style={{
                  width: patients.length
                    ? `${((patients.length - insuredCount )/ patients.length) * 100}%`
                    : '0%'
                }}
              />
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-gray-400">
                {insuredCount}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Uninsured
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}