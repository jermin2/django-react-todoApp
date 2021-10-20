# django-react-todoApp

Followed this:
https://www.section.io/engineering-education/react-and-django-rest-framework/

For learning how to use react and django together

Some tweaking had to be done (the source uses Bootstrap 4).
Namely
* The toggle function is not in the Bootstrap React docs. So I used the <code>show</code> api call instead
* Bootstrap React 5 Modal uses Modal.Header instead of ModalHeader, likewise Modal.Body, Modal.Footer.
* Checkboxs are no longer shown as <code>`<Input type="checkbox">`</code> but rather <code><Form.Check type="checkbox"></code>

Added functionality
* Can edit items (previously could just add new items)
