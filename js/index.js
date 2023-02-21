// Необходимо написать функцию-декоратор queryDecorator , которая позволяет выполнять
// сетевой запрос указанное количество раз (если произошла ошибка), через указанный
// промежуток времени.
// Изменять предоставленный код НЕЛЬЗЯ. Вам нужно только реализовать функцию
// queryDecorator .
// Функция принимает следующие аргументы:
// callback (декорируемая функция)
// количество повторов при неудачном запросе
// интервал между повторами

function queryDecorator(callback, count, timeout) {
  let currentCount = count;
  return function retryFetch(id) {
    try {
      if (currentCount > 0) {
        callback(id);
      }
    } catch (error) {
      currentCount -= 1;
      setTimeout(retryFetch, timeout, id);
    }
  };
}

const fetchObject = {
  url: "https://jsonplaceholder.typicode.com/todos",
  getTodoById(id) {
    return fetch(`${this.url}/${id}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  },
};
fetchObject.getTodoById = queryDecorator(fetchObject.getTodoById, 5, 500);
fetchObject.getTodoById(1);
