$("form").submit(function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  var name = $("input[name='name']").val();
  var email = $("input[name='email']").val();
  var phone = $("input[name='phone']").val();
  var comment = $("textarea[name='comment']").val();
  var area = $("select[name='area']").val();

  // Create the contact object
  var contact = {
    "name": name,
    "email": email,
    "phone": phone,
    "comment": comment,
    "area": area
  };

  // Fetch the existing contacts from GitHub
  $.getJSON("https://api.github.com/repos/<your_username>/<your_repository>/contents/contacts.json", function(data) {
    // Decode the content of contacts.json
    var contacts = JSON.parse(atob(data.content));

    // Add the new contact to the array
    contacts.push(contact);

    // Update the contacts.json content
    var updatedContent = JSON.stringify(contacts, null, 2);
    var encodedContent = btoa(updatedContent);

    // Make a PUT request to update the contacts.json file on GitHub
    $.ajax({
      url: "https://api.github.com/repos/<your_username>/<your_repository>/contents/contacts.json",
      type: "PUT",
      headers: {
        "Authorization": "Bearer <your_personal_access_token>"
      },
      data: JSON.stringify({
        "message": "Updated contacts.json",
        "content": encodedContent,
        "sha": data.sha
      }),
      success: function() {
        // Show success message or redirect to a thank you page
        $("#emailSentModal").modal("show");
      },
      error: function() {
        // Show error message or handle the error
      }
    });
  });
});
