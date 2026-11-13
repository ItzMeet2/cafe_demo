import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CAFE_ZONES } from '../data/cafeData';
import { TableBooking } from '../types';

interface TableReservationSectionProps {
  onReservationComplete?: (booking: TableBooking) => void;
}

export const TableReservationSection: React.FC<TableReservationSectionProps> = ({
  onReservationComplete
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('Garden Patio');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [date, setDate] = useState<string>('Today');
  const [timeSlot, setTimeSlot] = useState<string>('14:30');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const availableTimes = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out name and email.');
      return;
    }

    const newBooking: TableBooking = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: name,
      guestEmail: email,
      guestPhone: phone || '+91 98765 00000',
      date,
      timeSlot,
      guestsCount: guestCount,
      seatingArea: selectedZone as any,
      status: 'confirmed',
      createdAt: 'Just now'
    };

    setConfirmedBooking(newBooking);
    if (onReservationComplete) {
      onReservationComplete(newBooking);
    }
  };

  return (
    <section id="reservations" className="py-14 sm:py-20 bg-[#FBF9F5] border-t border-[#E8E3D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-1">
            02 / Seating
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
            Table Reservations
          </h2>
          <p className="text-xs text-[#78716C] mt-1 font-light">
            Guaranteed seating for meetings, work sessions, or weekend visits.
          </p>
        </div>

        {confirmedBooking ? (
          <div className="max-w-md p-6 rounded-lg bg-[#FFFFFF] border border-[#E8E3D8] space-y-4 font-mono text-xs shadow-xs">
            <div className="flex items-center gap-2 text-[#8C5E3C]">
              <Check className="w-4 h-4" />
              <span className="font-medium">Reservation Confirmed</span>
            </div>

            <div className="space-y-1.5 pt-2 text-[#78716C]">
              <div className="flex justify-between">
                <span>Guest:</span>
                <span className="text-[#1C1917] font-medium">{confirmedBooking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="text-[#1C1917] font-medium">{confirmedBooking.seatingArea}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="text-[#1C1917] font-medium">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Party Size:</span>
                <span className="text-[#1C1917] font-medium">{confirmedBooking.guestsCount} Guests</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#F0EBE1]">
                <span>Booking Ref:</span>
                <span className="text-[#8C5E3C] font-bold">#{confirmedBooking.id}</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full mt-4 py-2 rounded bg-[#F4F0E8] hover:bg-[#EAE5DC] text-[#1C1917] transition-colors font-medium"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookTable} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Zone selection */}
            <div className="lg:col-span-6 space-y-3 font-mono">
              <span className="text-[11px] text-[#A8A29E] uppercase tracking-wider block font-medium">
                Select Area
              </span>

              <div className="space-y-2">
                {CAFE_ZONES.map((zone) => {
                  const isSelected = selectedZone === zone.name;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.name)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#FAF8F3] border-[#1C1917]'
                          : 'bg-[#FFFFFF] border-[#E8E3D8] hover:border-[#D6CFBF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif text-[#1C1917] font-semibold">{zone.name}</span>
                        <span className="text-[10px] text-[#A8A29E] font-mono">{zone.capacity}</span>
                      </div>
                      <p className="text-[11px] text-[#78716C] font-sans mt-0.5 font-light">
                        {zone.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#A8A29E] uppercase font-medium">Date</span>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-2 px-2.5 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C]"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#A8A29E] uppercase font-medium">Time</span>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full py-2 px-2.5 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C]"
                  >
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Count */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#A8A29E] uppercase font-medium">Guests</span>
                <div className="flex gap-2">
                  {[1, 2, 4, 6].map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-1.5 rounded border transition-colors ${
                        guestCount === count
                          ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                          : 'border-[#E8E3D8] text-[#78716C] bg-[#FFFFFF]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 px-3 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C] placeholder:text-[#A8A29E]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-3 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C] placeholder:text-[#A8A29E]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile (+91)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2 px-3 rounded bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs focus:outline-none focus:border-[#8C5E3C] placeholder:text-[#A8A29E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium text-xs transition-colors shadow-xs"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
