const form = document.getElementById('budget-form');
const results = document.getElementById('results');
const budgetMessage = document.getElementById('budget-message');
const savingsTips = document.getElementById('savings-tips');
const budgetChart = document.getElementById('budgetChart');
const futureExpenses = document.getElementById('future-expenses');
const goalsDisplay = document.getElementById('goals-display');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const savings = income - expenses;

    // Mostrar resultados
    results.style.display = 'block';
    
    if (savings < 0) {
        budgetMessage.textContent = 'Estás gastando más de lo que ganas. ¡Revisa tus gastos!';
        budgetMessage.className = 'red';
        generateSavingsTips(false); // Consejos cuando el presupuesto está mal
    } else {
        budgetMessage.textContent = 'Tus ahorros son: ' + savings;
        budgetMessage.className = 'green';
        generateSavingsTips(true); // Consejos cuando el presupuesto está bien
    }

    // Crear gráfico de presupuesto
    createBudgetChart(income, expenses, savings);
});

// Función para generar consejos de ahorro
function generateSavingsTips(isBudgetGood) {
    savingsTips.innerHTML = ''; // Limpiar consejos anteriores
    
    let tips;
    if (isBudgetGood) {
        tips = [
            'Sigue ahorrando una parte de tus ingresos para futuros proyectos.',
            'Considera invertir tus ahorros para generar más ingresos.',
            'Revisa tus gastos y ajusta tu presupuesto para mejorar aún más.',
            'Establece metas financieras a largo plazo y planifica para alcanzarlas.',
        ];
    } else {
        tips = [
            'Considera reducir gastos innecesarios.',
            'Establece metas de ahorro a corto y largo plazo.',
            'Automatiza tus ahorros cada mes.',
            'Investiga sobre opciones de inversión.',
            'Crea un fondo de emergencia.'
        ];
    }

    tips.forEach(tip => {
        const tipElement = document.createElement('p');
        tipElement.textContent = tip;
        savingsTips.appendChild(tipElement);
    });
}

// Función para crear el gráfico de presupuesto
function createBudgetChart(income, expenses, savings) {
    const ctx = budgetChart.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos', 'Ahorros'],
            datasets: [{
                label: 'Cantidad',
                data: [income, expenses, savings],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Ingresos
                    'rgba(255, 99, 132, 0.6)', // Gastos
                    'rgba(75, 192, 192, 0.6)'  // Ahorros
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Mostrar la selección de gastos futuros
futureExpenses.addEventListener('change', function() {
    const selectedGoal = futureExpenses.value;
    goalsDisplay.textContent = 'Planeas gastar tus ahorros en: ' + selectedGoal;
});
