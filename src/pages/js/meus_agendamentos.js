document.addEventListener('DOMContentLoaded', () => {
    const appointmentsContainer = document.getElementById('appointments');

    const loadAppointments = () => {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointmentsContainer.innerHTML = '';

        if (appointments.length === 0) {
            appointmentsContainer.innerHTML = '<p class="text-center bg-gray-300 text-gray-700">Nenhum agendamento encontrado.</p>';
        } else {
            const list = document.createElement('ul');
            list.className = 'list-disc pl-5';

            appointments.forEach((appointment, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'mb-2  text-gray-700 flex justify-between items-center';
                listItem.innerHTML = `Dia ${appointment.day}/${appointment.month + 1}/${appointment.year} às ${appointment.slot}
                    <span>Serviço: ${appointment.service}, Veículo: ${appointment.vehicle}</span>
                    <button class="bg-red-500 text-white p-1 rounded" onclick="deleteAppointment(${index})">Excluir</button>`;
                list.appendChild(listItem);
            });

            appointmentsContainer.appendChild(list);
        }
    };

    window.deleteAppointment = (index) => {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    };

    loadAppointments();
});
