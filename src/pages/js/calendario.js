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

        const numDays = daysInMonth(currentMonth, currentYear);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        // Create initial empty cells
        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }

        // Fill in the days of the month
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
                openTimeSelector(day, currentMonth, currentYear);
            });

            cell.appendChild(dayLabel);
            cell.appendChild(button);
            row.appendChild(cell);
        }

        // Fill remaining cells in the last row
        while (row.children.length < 7) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        daysContainer.appendChild(row);
    };

    const openTimeSelector = (day, month, year) => {
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
                    ${timeSlots.map(slot => `<button class="bg-aqua-dark text-white p-2 rounded" onclick="selectTimeSlot(this)">${slot}</button>`).join('')}
                </div>
                <button class="mt-4 bg-red-500 text-white p-2 rounded" onclick="document.getElementById('time-selector').remove()">Fechar</button>
            </div>
        `;
    };

    window.selectTimeSlot = (button) => {
        button.classList.remove('bg-aqua-dark', 'text-white');
        button.classList.add('bg-gray-400', 'text-black');
        button.disabled = true;
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
