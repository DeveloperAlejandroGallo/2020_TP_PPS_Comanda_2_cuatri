import { Component, Input, OnInit } from '@angular/core';
import { Mesa } from 'src/app/models/mesa';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-espera',
  templateUrl: './listado-espera.component.html',
  styleUrls: ['./listado-espera.component.scss'],
})
export class ListadoEsperaComponent implements OnInit {

  public listadoEnEspera = null;
  public listadoMesas;
  public listadoMesasLibres = [];
  public mesaSelected = null;

  @Input() tipoListado: string;


  constructor(private firestore: FirestoreService) {

    let user: Usuario;
    firestore.getListaDeEspera().subscribe((resp: any) => {
      this.listadoEnEspera = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];

        user = new Usuario(element.payload.doc.data().nombre, element.payload.doc.data().apellido, element.payload.doc.data().dni, element.payload.doc.data().sexo, element.payload.doc.data().correo, element.payload.doc.data().perfil, element.payload.doc.data().tipo, element.payload.doc.data().aprobado, element.payload.doc.data().cuil, element.payload.doc.data().foto, element.payload.doc.id);

        this.listadoEnEspera.push(user);
      }

    });

    let mesa: Mesa;
    firestore.getMesas().subscribe((res: any) => {
      this.listadoMesas = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        mesa = new Mesa(element.payload.doc.data().cliente, element.payload.doc.data().comensales, element.payload.doc.data().estado, element.payload.doc.data().numero, element.payload.doc.data().pedido, element.payload.doc.data().tipo, element.payload.doc.id);

        this.listadoMesas.push(user);
        if (mesa.estado == "libre") this.listadoMesasLibres.push(mesa);
      }
      // this.listadoMesasLibres = this.listadoMesas.filter(mesa => mesa.estado == "libre");

    });



  }




  ngOnInit() { }


  ofrecerMesas(cliActual) {
    let asignada = 0;

    console.log(this.listadoMesasLibres);

    Swal.fire({
      title: 'La mesa ' + this.listadoMesasLibres[0].numero + ' se encuentra disponible',
      showDenyButton: true,
      confirmButtonText: `Asignar`,
      denyButtonText: `No gracias`
    }).then((result0) => {
      if (result0.isConfirmed) {
        this.asignarMesa(cliActual,this.listadoMesasLibres[0]);
        Swal.fire('Mesa ' + this.listadoMesasLibres[0].numero + ' asignada!', '', 'success')
        asignada = 1;
      } else if (result0.isDenied) {
        if (this.listadoMesasLibres[1]) {
        Swal.fire({
          title: 'La mesa ' + this.listadoMesasLibres[1].numero + ' se encuentra disponible',
          showDenyButton: true,
          confirmButtonText: `Asignar`,
          denyButtonText: `No gracias`
        }).then((result1) => {
          if (result1.isConfirmed) {
            this.asignarMesa(cliActual,this.listadoMesasLibres[1]);
            Swal.fire('Mesa ' + this.listadoMesasLibres[1].numero + ' asignada!', '', 'success')
            asignada = 1;
          } else if (result1.isDenied) {

            if (this.listadoMesasLibres[2]) {
              Swal.fire({
                title: 'La mesa ' + this.listadoMesasLibres[2].numero + ' se encuentra disponible',
                showDenyButton: true,
                confirmButtonText: `Asignar`,
                denyButtonText: `No gracias`
              }).then((result2) => {
                if (result2.isConfirmed) {
                  this.asignarMesa(cliActual,this.listadoMesasLibres[2]);
                  Swal.fire('Mesa ' + this.listadoMesasLibres[2].numero + ' asignada!', '', 'success')
                  asignada = 2;
                } else if (result2.isDenied) {
                  if (this.listadoMesasLibres[3]) {
                    Swal.fire({
                      title: 'La mesa ' + this.listadoMesasLibres[3].numero + ' se encuentra disponible',
                      showDenyButton: true,
                      confirmButtonText: `Asignar`,
                      denyButtonText: `No gracias`
                    }).then((result3) => {
                      if (result3.isConfirmed) {
                        this.asignarMesa(cliActual,this.listadoMesasLibres[3]);
                        Swal.fire('Mesa ' + this.listadoMesasLibres[3].numero + ' asignada!', '', 'success')
                        asignada = 3;
                      } else if (result3.isDenied) {
                        if (this.listadoMesasLibres[4]) {
                          Swal.fire({
                            title: 'La mesa ' + this.listadoMesasLibres[4].numero + ' se encuentra disponible',
                            showDenyButton: true,
                            confirmButtonText: `Asignar`,
                            denyButtonText: `No gracias`
                          }).then((result4) => {
                            if (result4.isConfirmed) {
                              this.asignarMesa(cliActual,this.listadoMesasLibres[4]);
                              Swal.fire('Mesa ' + this.listadoMesasLibres[4].numero + ' asignada!', '', 'success')
                              asignada = 4;
                            } else if (result4.isDenied) {
                              if (this.listadoMesasLibres[5]) {
                                Swal.fire({
                                  title: 'La mesa ' + this.listadoMesasLibres[5].numero + ' se encuentra disponible',
                                  showDenyButton: true,
                                  confirmButtonText: `Asignar`,
                                  denyButtonText: `No gracias`
                                }).then((result5) => {
                                  if (result5.isConfirmed) {
                                    this.asignarMesa(cliActual,this.listadoMesasLibres[5]);
                                    Swal.fire('Mesa ' + this.listadoMesasLibres[5].numero + ' asignada!', '', 'success')
                                    asignada = 5;
                                  } else if (result5.isDenied) {

                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })


            }
          }
        // }).finally(()=>{
        //   if(asignada == 0)
        //   Swal.fire('No hay más mesas disponibles','','warning');
      
        });
        }
        
      }
    });
    



  }


  asignarMesa(cliente,mesa){

    cliente.enMesa = true;
    console.log(cliente);
    console.log(cliente.toJson());
    this.firestore.updateBD(cliente.id,cliente.toJson(),'usuarios').then(() =>{
      mesa.cliente = cliente.toJson();
      mesa.estado = 'ocupada';
      this.firestore.updateBD(mesa.id,mesa.toJson(),'mesas').then(()=>{
        this.quitarEnEspera(cliente);
        console.log("Los dos asignados");


      });
    });

  }

  quitarEnEspera(cliente){
    this.firestore.deleteRegFrom(cliente.id,'listaDeEspera');
  }



  aprobarCliente(user) {

    Swal.fire({
      title: '¿Aprobar cliente?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        user.aprobado = true;
        this.firestore.updateUser(user.id, user.toJson()).then(() => {
          Swal.fire('Cliente Aprobado!', '', 'success')
        });
      } else if (result.isDenied) {
        user.aprobado = false;
        this.firestore.updateUser(user.id, user.toJson()).then(() => {
          Swal.fire('Cliente Rechazado', '', 'error')
        });
      }
    })


  }


}