$(document).ready(function () {
  const cargos = [];

  $("#cargoForm").on("submit", function (event) {
    event.preventDefault();

    const cargoName = $("#cargoName").val();
    const dispatchDate = $("#dispatchDate").val();
    const status = $("#status").val();

    // Проверка на пустые поля
    if (!cargoName || !dispatchDate || !status) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(dispatchDate);

    if (status === "delivered" && selectedDate > currentDate) {
      alert(
        'Ошибка: Дата отправления находится в будущем. Не можете установить статус "Доставлен".'
      );
      return;
    }

    cargos.push({
      name: cargoName,
      dispatchDate: dispatchDate,
      status: status,
    });

    $(this).trigger("reset");

    updateCargoTable();
  });

  $("#statusFilter").on("change", function () {
    updateCargoTable();
  });

  function updateCargoTable() {
    const filterValue = $("#statusFilter").val();
    const filteredCargos = cargos.filter(
      (cargo) => !filterValue || cargo.status === filterValue
    );
    const tbody = $("#cargoTableBody");
    tbody.empty();

    filteredCargos.forEach((cargo) => {
      tbody.append(`
                <tr class="status-${cargo.status}">
                    <td>${cargo.name}</td>
                    <td>${cargo.dispatchDate}</td>
                    <td>${capitalizeFirstLetter(
                      cargo.status.replace("-", " ")
                    )}</td>
                    <td><button class="btn btn-danger delete-cargo">Удалить</button></td>
                </tr>
            `);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $("#cargoTableBody").on("click", ".delete-cargo", function () {
    const row = $(this).closest("tr");
    const index = row.index();
    cargos.splice(index, 1);
    updateCargoTable();
  });
});
