document.addEventListener('DOMContentLoaded', () => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const updateCalendar = () => {
        document.getElementById('mes').textContent = `${monthNames[currentMonth]} ${currentYear}`;
        document.getElementById('ano').textContent = currentYear;
        const daysContainer = document.getElementById('dias');
        daysContainer.innerHTML = '';

        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        const numDays = daysInMonth(currentMonth, currentYear);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }

        for (let day = 1; day <= numDays; day++) {
            if (row.children.length === 7) {
                daysContainer.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.className = 'p-2 border relative';
            
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.className = 'absolute top-2 left-2 text-xs text-aqua-dark';

            const button = document.createElement('button');
            button.textContent = 'Selecionar Horário';
            button.className = 'mt-4 bg-aqua-dark text-white p-1 rounded text-xs';
            button.addEventListener('click', () => {
                openTimeSelector(day, currentMonth, currentYear, appointments);
            });

            cell.appendChild(dayLabel);
            cell.appendChild(button);
            row.appendChild(cell);
        }

        while (row.children.length < 7) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        daysContainer.appendChild(row);
    };

    const openTimeSelector = (day, month, year, appointments) => {
        const timeSlots = [];
        for (let hour = 8; hour <= 17; hour++) {
            timeSlots.push(`${hour < 10 ? '0' : ''}${hour}:00`);
        }

        let timeSelector = document.getElementById('time-selector');
        if (!timeSelector) {
            timeSelector = document.createElement('div');
            timeSelector.id = 'time-selector';
            timeSelector.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50';
            document.body.appendChild(timeSelector);
        }

        timeSelector.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow-lg">
                <h2 class="text-xl mb-4 text-aqua-dark">Selecione um horário para ${day}/${month + 1}/${year}</h2>
                <div class="grid grid-cols-3 gap-2">
                    ${timeSlots.map(slot => {
                        const isBooked = appointments.some(app => app.day === day && app.month === month && app.year === year && app.slot === slot);
                        return `<button class="bg-${isBooked ? 'gray-400' : 'aqua-dark'} text-${isBooked ? 'black' : 'white'} p-2 rounded" ${isBooked ? 'disabled' : ''} onclick="selectTimeSlot(${day}, ${month}, ${year}, '${slot}')">${slot}</button>`;
                    }).join('')}
                </div>
                <div id="services-vehicle">
                    <h3 class="text-lg my-4 text-aqua-dark">Serviços</h3>
                    <select id="services">
                        <option value="Lavagem Interna">Lavagem
                        Interna</option>
                        <option value="Lavagem Simples">Lavagem Simples</option>
                        <option value="Enceramento">Enceramento</option>
                    </select>
                    <h3 class="text-lg my-4 text-aqua-dark">Tipo de Veículo</h3>
                    <select id="vehicle-type">
                        <option value="Carro">Carro</option>
                        <option value="Moto">Moto</option>
                        <option value="Van">Van</option>
                        <option value="Caminhão">Caminhão</option>
                        <option value="Ônibus">Ônibus</option>
                    </select>
                </div>
                <button class="mt-4 bg-red-500 text-white p-2 rounded" onclick="document.getElementById('time-selector').remove()">Fechar</button>
                <button id="confirm-appointment" class="mt-4 bg-green-500 text-white p-2 rounded">Confirmar Agendamento</button>
            </div>
        `;

        document.getElementById('confirm-appointment').addEventListener('click', () => {
            confirmAppointment(day, month, year);
        });
    };

    window.selectTimeSlot = (day, month, year, slot) => {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const isBooked = appointments.some(app => app.day === day && app.month === month && app.year === year && app.slot === slot);
        if (!isBooked) {
            let selectedSlot = { day, month, year, slot };
            localStorage.setItem('selectedSlot', JSON.stringify(selectedSlot));

            let buttons = document.querySelectorAll('#time-selector button');
            buttons.forEach(button => {
                button.disabled = false;
                button.className = 'bg-aqua-dark text-white p-2 rounded';
            });

            let button = [...buttons].find(button => button.textContent === slot);
            button.classList.remove('bg-aqua-dark', 'text-white');
            button.classList.add('bg-gray-400', 'text-black');
            button.disabled = true;
        } else {
            alert('Este horário já está agendado.');
        }
    };

    const confirmAppointment = (day, month, year) => {
        let selectedSlot = JSON.parse(localStorage.getItem('selectedSlot'));
        let service = document.getElementById('services').value;
        let vehicle = document.getElementById('vehicle-type').value;
    
        if (selectedSlot) {
            selectedSlot.service = service;
            selectedSlot.vehicle = vehicle;
    
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(selectedSlot);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            localStorage.removeItem('selectedSlot');
            document.getElementById('time-selector').remove();
            updateCalendar();
        } else {
            alert('Por favor, selecione um horário.');
        }
    };
    
    

    
    document.getElementById('btn_prev').addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        if (currentMonth === 11) currentYear--;
        updateCalendar();
    });

    document.getElementById('btn_next').addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        if (currentMonth === 0) currentYear++;
        updateCalendar();
    });

    updateCalendar();
});
