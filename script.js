document.addEventListener("DOMContentLoaded", () => {
    const timeSelect = document.getElementById("time");
    const services = document.querySelectorAll(".service");
    const totalElement = document.getElementById("total");
    const confirmAppointmentButton = document.getElementById("confirmAppointment");
    const pixSection = document.getElementById("pixSection");
    const pixCode = document.getElementById("pixCode");
    const copyPixButton = document.getElementById("copyPix");
    const finalizeAppointmentButton = document.getElementById("finalizeAppointment");

    // Preencher horários disponíveis
    const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    availableTimes.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });

    // Atualizar total
    services.forEach(service => {
        service.addEventListener("change", () => {
            let total = 0;
            services.forEach(service => {
                if (service.checked) {
                    total += parseFloat(service.value);
                }
            });
            totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        });
    });

    // Mostrar seção de PIX e preparar mensagem
    confirmAppointmentButton.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value.trim();
        const time = document.getElementById("time").value.trim();
        const selectedServices = Array.from(services)
            .filter(service => service.checked)
            .map(service => service.dataset.name);

        if (!name || !phone || !date || !time || selectedServices.length === 0) {
            alert("Por favor, preencha todos os campos e selecione pelo menos um serviço.");
            return;
        }

        const servicesText = selectedServices.join(", ");
        const total = selectedServices.reduce((acc, service) => {
            const serviceElement = document.querySelector(`[data-name="${service}"]`);
            return acc + parseFloat(serviceElement.value);
        }, 0).toFixed(2).replace(".", ",");

        const message = `Olá Renovo Barber, gostaria de confirmar meu agendamento com as seguintes informações:\n
Nome: ${name}\n
Telefone: ${phone}\n
Data: ${date}\n
Horário: ${time}\n
Serviços: ${servicesText}\n
Total: R$ ${total} reais\n
Pagamento via PIX confirmado.`;

        // Exibir o PIX
        pixSection.classList.remove("hidden");

        // Abrir WhatsApp diretamente
        const whatsappLink = `https://wa.me/31990723954?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
    });

    // Copiar código PIX
    copyPixButton.addEventListener("click", () => {
        pixCode.select();
        document.execCommand("copy");
        alert("Código PIX copiado!");
    });

    // Confirmar agendamento final
    finalizeAppointmentButton.addEventListener("click", () => {
        alert("Seu agendamento foi confirmado com sucesso!");
    });
});
