/* eslint-disable no-console */
import React from 'react';

// eslint-disable-next-line import/no-unresolved
import {
  AlertDialog,
  ConfirmationDialog,
  Dialog,
  Form,
  FormGroupInput,
  useAlertDialog,
  useConfirmationDialog,
  useDialog,
} from '../dist/main';

export function DialogExamples() {
  const { showDialog, DialogPortal } = useDialog({
    title: 'useDialog',
    body: ({ foo, bar }) => (
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam sequi vero sapiente delectus error sunt, a
        eveniet nobis est ex magni nesciunt magnam. Eaque eius hic eligendi dolorum ut quas?
        <p>
          Extra props: {foo} {bar}
        </p>
      </div>
    ),
  });
  const {
    showDialog: showAutoCloseDialog,
    closeDialog: close,
    DialogPortal: AutoCloseDialogPortal,
  } = useDialog({
    title: 'autoCloseDialog',
    body: ({}) => {
      return <div>This dialog will close after 5 seconds, and it will close regardless of the user interation</div>;
    },
  });
  const { showDialog: showConfirmationDialog, DialogPortal: ConfirmationDialogPortal } = useConfirmationDialog({
    title: 'useConfirmationDialog',
    message: ({ foo }) => <em>Opened by useConfirmationDialog. Extra props: {foo}</em>,
    onProceed: () => console.info('onProceed'),
    onCancel: () => console.warn('onCancel'),
  });
  const { showDialog: showAlertDialog, DialogPortal: AlertDialogPortal } = useAlertDialog({
    title: 'useAlertDialog',
    message: ({ bar }) => <em>Opened by useAlertDialog. Extra props: {bar}</em>,
    onClose: () => console.warn('onClose'),
  });

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="h4">Simple Dialog</h1>
        <Dialog
          title="Simple dialog"
          body={
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam sequi vero sapiente delectus error
              sunt, a eveniet nobis est ex magni nesciunt magnam. Eaque eius hic eligendi dolorum ut quas?
            </div>
          }
          keyboard={false}
        >
          <a href="" className="btn btn-primary">
            Simple Dialog
          </a>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4">No header Dialog</h1>
        <Dialog
          body={
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam sequi vero sapiente delectus error
              sunt, a eveniet nobis est ex magni nesciunt magnam. Eaque eius hic eligendi dolorum ut quas?
            </div>
          }
          keyboard={false}
        >
          <a href="" className="btn btn-primary">
            No header Dialog
          </a>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Scrolling long content Dialog</h1>
        <Dialog
          title="Long content dialog"
          contentClassName="h-25"
          body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur optio sequi dicta quia quaerat natus quisquam minus molestiae ipsa accusantium, hic amet quis aliquam dolor. Odit, error placeat! Magni, voluptatum!
        Ut esse iusto quae quod in quas minus aliquid cum veniam, eius, ipsa corrupti dolorem quaerat, recusandae voluptatibus necessitatibus ea unde exercitationem? Est quod in corrupti porro nam necessitatibus suscipit!
        Optio voluptate, pariatur officia voluptates perferendis, consectetur saepe iste nobis ea accusamus, et quia eum eligendi earum expedita possimus vero! Optio adipisci minus debitis nostrum asperiores alias fugit tempora dicta.
        Doloremque facilis rerum suscipit accusantium eveniet in nesciunt debitis. Iste placeat voluptatum quisquam architecto quidem, eos fugit impedit accusamus soluta et harum ipsa ad perspiciatis, odit nesciunt sit possimus sed.
        Nam in vitae, ipsum beatae eveniet, odit itaque sit aliquid delectus veritatis reprehenderit libero enim quibusdam ipsa incidunt est alias eligendi omnis sed similique nemo quisquam. Reiciendis similique placeat quia.
        Nemo explicabo maiores minus debitis eligendi soluta qui quam suscipit dolores possimus velit temporibus, adipisci inventore recusandae dignissimos dicta vitae modi. Autem perspiciatis doloremque corrupti quas deleniti ex sapiente iure.
        Quae quas odit libero accusamus nostrum architecto nihil optio eaque sequi iste aut, aperiam illum blanditiis perferendis distinctio earum pariatur? Earum provident minus ullam cupiditate nihil perferendis error corporis alias?
        Repudiandae dignissimos maiores expedita sunt, debitis optio nobis ad iure harum quasi exercitationem esse odit, numquam fugiat reiciendis quas ratione voluptatem nisi atque explicabo ducimus ea itaque. Quibusdam, sequi! Dignissimos.
        Ducimus, ullam natus reiciendis maxime ipsam magni repellendus, distinctio consequuntur nostrum ipsum odio numquam rerum perferendis quod quo excepturi, voluptatibus sunt veritatis beatae hic animi. Provident accusamus voluptates illo maiores?
        Iste ex similique enim ipsum perferendis repellat sunt nam velit eum quas excepturi consequatur quibusdam numquam rerum, dolore optio eligendi, consequuntur tempore? Fugiat reprehenderit, veritatis aspernatur perspiciatis nobis sint rerum."
          scrollable={true}
        >
          <button className="btn btn-primary">Long content</button>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Close dialog from body/footer</h1>
        <Dialog
          title="Custom footer dialog"
          body={({ close }) => (
            <>
              <strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam amet rerum ducimus maiores deleniti
                ullam necessitatibus, minus dolore maxime repellat provident perspiciatis veritatis eum sunt? Nam quo
                vel quia qui.
              </strong>
              <button type="button" className="btn btn-primary" onClick={close}>
                Close from body
              </button>
            </>
          )}
          footer={({ close }) => (
            <button type="button" className="btn btn-primary" onClick={close}>
              Close from footer
            </button>
          )}
          staticBackdrop={true}
          useTimesClose={false}
        >
          <a href="">&amp;</a>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Confirmation dialog</h1>
        <ConfirmationDialog
          title="Atention!"
          message="Are you sure you want to proceed?"
          onProceed={() => console.info('onProceed')}
          onCancel={() => console.warn('onCancel')}
        >
          <button type="button" className="btn btn-warning">
            Do something
          </button>
        </ConfirmationDialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Alert dialog</h1>
        <AlertDialog
          message="Checking new updates"
          onClose={() => Promise.resolve().then(() => console.warn('onClose'))}
        >
          <button type="button" className="btn btn-info">
            Check
          </button>
        </AlertDialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Form dialog</h1>
        <Dialog
          title="Edit item"
          body={({ close }) => (
            <Form
              initialValues={{}}
              onSubmit={(data) => {
                console.info('submit', data);
                close();
              }}
              onCancel={() => {
                console.warn('cancel');
                close();
              }}
              validations={{
                test: [
                  {
                    message: 'Should be different from test',
                    validate(value) {
                      return value !== 'test';
                    },
                  },
                ],
              }}
            >
              <FormGroupInput name="test" label="Test" required />
            </Form>
          )}
        >
          <button type="button" className="btn btn-primary">
            Add item
          </button>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Overlaping dialogs</h1>
        <Dialog
          title="First dialog"
          size="lg"
          body={
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptatem reprehenderit laudantium
              facilis necessitatibus sed optio nihil fugiat numquam minus earum ipsum quam ab harum natus, velit libero
              excepturi quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corrupti maxime,
              magni possimus pariatur iste incidunt. Dolore adipisci quaerat nemo dicta voluptas beatae voluptates rem
              neque veritatis, necessitatibus ipsam corporis?
              <br />
              <Dialog
                title="Second dialog"
                size="lg"
                body={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptatem reprehenderit laudantium
                    facilis necessitatibus sed optio nihil fugiat numquam minus earum ipsum quam ab harum natus, velit
                    libero excepturi quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corrupti
                    maxime, magni possimus pariatur iste incidunt. Dolore adipisci quaerat nemo dicta voluptas beatae
                    voluptates rem neque veritatis, necessitatibus ipsam corporis?
                    <AlertDialog message="Third dialog">
                      <button type="button" className="btn btn-warning">
                        Open third dialog
                      </button>
                    </AlertDialog>
                  </>
                }
              >
                <button type="button" className="btn btn-info">
                  Open second dialog
                </button>
              </Dialog>
            </>
          }
        >
          <button type="button" className="btn btn-secondary">
            Open first dialog
          </button>
        </Dialog>
      </div>
      <div className="col-6">
        <h1 className="h4 mt-3">Open a dialog programmatically</h1>

        <DialogPortal />
        <button type="button" className="btn btn-primary" onClick={() => showDialog({ foo: 'Foo', bar: 'Bar' })}>
          useDialog
        </button>
        <AutoCloseDialogPortal />
        <button
          type="button"
          className="btn btn-primary ml-2"
          onClick={() => {
            showAutoCloseDialog();
            setTimeout(() => {
              close();
            }, 5000);
          }}
        >
          autoCloseDialog
        </button>
        <ConfirmationDialogPortal />
        <button type="button" className="btn btn-warning ml-2" onClick={() => showConfirmationDialog({ foo: 'FOO' })}>
          useConfirmationDialog
        </button>
        <AlertDialogPortal />
        <button type="button" className="btn btn-info ml-2" onClick={() => showAlertDialog({ bar: 'BAR' })}>
          useAlertDialog
        </button>
      </div>
    </div>
  );
}
