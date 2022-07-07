import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  categorias,
  datosIniciales,
  tipos,
  valoraciones,
} from '../common/data';
import {
  Category,
  Language,
  Type,
  Valoration,
} from '../programming-languages/interfaces/interfaces';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  private _languages: Language[] =
    localStorage.getItem('lenguajes') !== null
      ? JSON.parse(localStorage.getItem('lenguajes')!)
      : datosIniciales;
  private _id: number =
    this._languages.length === 0 ? 1 : this._languages.length + 1;
  private _searchValue!: string;
  private _categoryValue!: string;
  private _typeValue!: string;
  private _valorationValue!: string;
  private _languageSubject = new BehaviorSubject<Language[]>(this._languages);
  private _aviableCategoriesSubject = new BehaviorSubject<Category[]>(
    categorias
  );
  private _filterCategories: Category[] = [];

  private _aviableTypeSubject = new BehaviorSubject<Type[]>(tipos);
  private _filterTypes: Type[] = [];

  private _aviableValorationsSubject = new BehaviorSubject<Valoration[]>(
    valoraciones
  );
  private _filterValorations: Valoration[] = [];

  /**
   * Creo un get para mandar la información de los lenguajes
   * ya que no quiero que estos lenguajes se puedan manipular desde ningun
   * otro sitio de mi aplicacion
   */

  get languages$(): Observable<Language[]> {
    return this._languageSubject.asObservable().pipe(
      //Aquí implemento la logica para realizar el filtro de búsqueda. Paso a paso
      //1º el filtro del input
      //Trabajo todo el rato sobre el ultimo elemento devuelto
      map((languages) => {
        if (!this._searchValue || !this._searchValue.length) {
          return languages;
        }
        return languages.filter((language) => {
          return `${language.nombre} ${language.categoria} ${language.tipo}`
            .toLowerCase()
            .includes(this._searchValue.toLowerCase());
        });
      }),
      //2º de los datos obtenidos recoger los valores para mandarselos al componente
      tap(
        //aqui dentro compruebo las categorias que hay dentro del array filtrado y las emito
        //como nuevo valor del observable de _aviableCategoriesSubject
        //Hago lo mismo para los tipos y las valoraciones
        (languages) => {
          this._filterCategories = [];
          this._filterTypes = [];
          this._filterValorations = [];
          const sortLanguageByValoration = languages.sort(function (a, b) {
            if (a.valoracion > b.valoracion) {
              return -1;
            }
            if (a.valoracion < b.valoracion) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
          languages.forEach((language) => {
            const matchCategory = this._filterCategories.find(
              (category) => language.categoria === category.categoria
            );
            const matchType = this._filterTypes.find(
              (type) => language.tipo === type.tipo
            );
            const matchValoration = this._filterValorations.find(
              () =>
                language.valoracion <= sortLanguageByValoration[0].valoracion
            );
            if (matchCategory === undefined) {
              this._filterCategories.push({
                categoria: language.categoria,
              });
            }
            if (matchType === undefined) {
              this._filterTypes.push({
                tipo: language.tipo,
              });
            }
            if (matchValoration === undefined) {
              //hago un for para hacer el push desde 0 hasta el valor del lenguaje
              for (let i = 0; i < language.valoracion; i++) {
                this._filterValorations.push({
                  valoracion: i + 1,
                  descripcion: `mayor o igual a ${i + 1}`,
                });
              }
            }
            this._aviableCategoriesSubject.next(this._filterCategories);
            this._aviableTypeSubject.next(this._filterTypes);
            this._aviableValorationsSubject.next(this._filterValorations);
          });
        }
      ),
      //3º el filtro de los selectores realizaremos otro map()
      //puedo hacer el filtrado de los selectores en el mismo map
      map((languages) => {
        if (!this._categoryValue || !this._categoryValue.length) {
          return languages;
        }
        return languages.filter((language) => {
          return language.categoria === this._categoryValue;
        });
      }),
      tap(
        //aqui dentro compruebo las categorias que hay dentro del array filtrado y las emito
        //como nuevo valor del observable de _aviableCategoriesSubject
        //Hago lo mismo para los tipos y las valoraciones
        (languages) => {
          this._filterCategories = [];
          this._filterTypes = [];
          this._filterValorations = [];
          const sortLanguageByValoration = languages.sort(function (a, b) {
            if (a.valoracion > b.valoracion) {
              return -1;
            }
            if (a.valoracion < b.valoracion) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
          languages.forEach((language) => {
            const matchCategory = this._filterCategories.find(
              (category) => language.categoria === category.categoria
            );
            const matchType = this._filterTypes.find(
              (type) => language.tipo === type.tipo
            );
            const matchValoration = this._filterValorations.find(
              () =>
                language.valoracion <= sortLanguageByValoration[0].valoracion
            );
            if (matchCategory === undefined) {
              this._filterCategories.push({
                categoria: language.categoria,
              });
            }
            if (matchType === undefined) {
              this._filterTypes.push({
                tipo: language.tipo,
              });
            }
            if (matchValoration === undefined) {
              //hago un for para hacer el push desde 0 hasta el valor del lenguaje
              for (let i = 0; i < language.valoracion; i++) {
                this._filterValorations.push({
                  valoracion: i + 1,
                  descripcion: `mayor o igual a ${i + 1}`,
                });
              }
            }
            this._aviableCategoriesSubject.next(this._filterCategories);
            this._aviableTypeSubject.next(this._filterTypes);
            this._aviableValorationsSubject.next(this._filterValorations);
          });
        }
      ),
      //repetir los pasos 2 y 3 tantas veces como filtros de selectores haya
      map((languages) => {
        if (!this._typeValue || !this._typeValue.length) {
          return languages;
        }
        return languages.filter((language) => {
          return language.tipo === this._typeValue;
        });
      }),
      tap(
        //aqui dentro compruebo las categorias que hay dentro del array filtrado y las emito
        //como nuevo valor del observable de _aviableCategoriesSubject
        //Hago lo mismo para los tipos y las valoraciones
        (languages) => {
          this._filterCategories = [];
          this._filterTypes = [];
          this._filterValorations = [];
          const sortLanguageByValoration = languages.sort(function (a, b) {
            if (a.valoracion > b.valoracion) {
              return -1;
            }
            if (a.valoracion < b.valoracion) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
          languages.forEach((language) => {
            const matchCategory = this._filterCategories.find(
              (category) => language.categoria === category.categoria
            );
            const matchType = this._filterTypes.find(
              (type) => language.tipo === type.tipo
            );
            const matchValoration = this._filterValorations.find(
              () =>
                language.valoracion <= sortLanguageByValoration[0].valoracion
            );
            if (matchCategory === undefined) {
              this._filterCategories.push({
                categoria: language.categoria,
              });
            }
            if (matchType === undefined) {
              this._filterTypes.push({
                tipo: language.tipo,
              });
            }
            if (matchValoration === undefined) {
              //hago un for para hacer el push desde 0 hasta el valor del lenguaje
              for (let i = 0; i < language.valoracion; i++) {
                this._filterValorations.push({
                  valoracion: i + 1,
                  descripcion: `mayor o igual a ${i + 1}`,
                });
              }
            }
            this._aviableCategoriesSubject.next(this._filterCategories);
            this._aviableTypeSubject.next(this._filterTypes);
            this._aviableValorationsSubject.next(this._filterValorations);
          });
        }
      ),
      map((languages) => {
        if (!this._valorationValue || !isNaN(parseInt(this._typeValue))) {
          return languages;
        }
        //this._filterLanguages =
        return languages.filter((language) => {
          return language.valoracion >= parseInt(this._valorationValue);
        });
      }),
      tap(
        //aqui dentro compruebo las categorias que hay dentro del array filtrado y las emito
        //como nuevo valor del observable de _aviableCategoriesSubject
        //Hago lo mismo para los tipos y las valoraciones
        (languages) => {
          this._filterCategories = [];
          this._filterTypes = [];
          this._filterValorations = [];
          const sortLanguageByValoration = languages.sort(function (a, b) {
            if (a.valoracion > b.valoracion) {
              return -1;
            }
            if (a.valoracion < b.valoracion) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
          languages.forEach((language) => {
            const matchCategory = this._filterCategories.find(
              (category) => language.categoria === category.categoria
            );
            const matchType = this._filterTypes.find(
              (type) => language.tipo === type.tipo
            );
            const matchValoration = this._filterValorations.find(
              () =>
                language.valoracion <= sortLanguageByValoration[0].valoracion
            );
            if (matchCategory === undefined) {
              this._filterCategories.push({
                categoria: language.categoria,
              });
            }
            if (matchType === undefined) {
              this._filterTypes.push({
                tipo: language.tipo,
              });
            }
            if (matchValoration === undefined) {
              //hago un for para hacer el push desde 0 hasta el valor del lenguaje
              for (let i = 0; i < language.valoracion; i++) {
                this._filterValorations.push({
                  valoracion: i + 1,
                  descripcion: `mayor o igual a ${i + 1}`,
                });
              }
            }
            this._aviableCategoriesSubject.next(this._filterCategories);
            this._aviableTypeSubject.next(this._filterTypes);
            this._aviableValorationsSubject.next(this._filterValorations);
          });
        }
      )

      //cabecera y paginación

      /**
       *1. para la cabecerá deberé crear una función que indique la cabecerá tocada
       *y el orden de esta cabecera. Esta función gestionará los valores de ordenación
       *y ejecutará la función refresh() para emitir nuevos valores del observable
       *ahora, dentro de un map ejecuto la función sort y realizo la ordenación con los
       *parámetros establecidos.
       *NOTA: Recordar que el boton de restablecer filtros debe ordenar por defecto en orden ascendente
       *y por id
       */
    );
  }

  get aviableCategories$(): Observable<Category[]> {
    return this._aviableCategoriesSubject.asObservable();
    /** TODA LA LOGICA SE EJECUTA DENTRO DEL PIPE PRINCIPAL
     *
     *  .pipe(
       tap((cat) => console.log('en el map del get', cat)!),
       map((categories) => {
         this._filterCategories = [];
         console.log('Lenguajes filtrados', this._filterLanguages);
         console.log('categorias iniciales', categories);
         console.log('categorias filtradas', this._filterCategories);
         this._filterLanguages.forEach((language) => {
           console.log('lenguaje a evaluar', language);
           const value = this._filterCategories.find(
             (category) => language.categoria === category.categoria
           );
           if (value === undefined) {
             this._filterCategories.push({
               categoria: language.categoria,
             });
           }
         });

         return this._filterCategories;
       })
     );
     */
  }

  get aviableTypes$(): Observable<Type[]> {
    return this._aviableTypeSubject.asObservable();
    /** TODA LA LOGICA SE EJECUTA DENTRO DEL PIPE PRINCIPAL
     * .pipe(
      map((types) => {
        this._filterTypes = [];
        this._filterLanguages.forEach((language) => {
          const value = this._filterTypes.find(
            (type) => language.tipo === type.tipo
          );
          if (value === undefined) {
            this._filterTypes.push({ tipo: language.tipo });
          }
        });
        return this._filterTypes;
      })
    );
     */
  }
  get aviableValorations$(): Observable<Valoration[]> {
    return this._aviableValorationsSubject.asObservable();
  }

  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() {}

  addLanguage(languaje: Language) {
    const dataForm = {
      ...languaje,
      id: this._id,
    };
    this._languages = [...this._languages, dataForm];
    this._id++;
    localStorage.setItem('lenguajes', JSON.stringify(this._languages));
    this.refreshLanguages();
  }

  filterLanguagesByName(inputData: string) {
    //función que ejecutará una función de refresco, que hará que el observable emita un nuevo valor y devolverá el input
    this._searchValue = inputData;
    this.refreshLanguages();
  }
  /**
  *  filterLanguages(
    search: string,
    category: string,
    type: string,
    valoration: string
  ): Language[] {
    console.log('busqueda', search);
    console.log('categoria', category);
    console.log('tipo', type);
    console.log('valoracion', parseInt(valoration));

    //const inputDataToLowerCase = search.toLowerCase();
    this._filterLanguages = this._languages.filter((language) =>
      //al hacer el filtrado usando strings vacios no me devuelve ningun elemento del array
      // search !== ''
      //   ? language.nombre.toLowerCase().includes(inputDataToLowerCase)
      //   : '' &&
      category !== ''
        ? language.categoria === category
        : language.categoria && type !== ''
        ? language.tipo === type
        : language.tipo && valoration !== ''
        ? language.valoracion >= parseInt(valoration)
        : language.valoracion >= 1
    );
    console.log('array filtrado', this._filterLanguages);
    return this._filterLanguages;
  }
  *
  */

  filterCategory(category: string) {
    if (category === 'Todos') {
      this._categoryValue = '';
    } else {
      this._categoryValue = category;
    }
    this.refreshLanguages();
  }

  filterType(type: string) {
    if (type === 'Todos') {
      this._typeValue = '';
    } else {
      this._typeValue = type;
    }
    this.refreshLanguages();
  }

  filterValoration(valoration: string) {
    this._valorationValue = valoration;
    this.refreshLanguages();
  }

  sortByName(order: boolean) {
    /**
    *  this._languageSubject
      .asObservable()
      .pipe(
        map((languages) => {
          console.log(languages);
          languages.sort(function (a, b) {
            if (order) {
              if (a.nombre > b.nombre) {
                return 1;
              }
              if (a.nombre < b.nombre) {
                return -1;
              }
              // a must be equal to b
              return 0;
            } else {
              if (a.nombre > b.nombre) {
                return -1;
              }
              if (a.nombre < b.nombre) {
                return 1;
              }
              // a must be equal to b
              return 0;
            }
          });
          this._filterLanguages = languages;
          return this._filterLanguages;
        })
      )
      .subscribe();
    */
  }

  sortByCategory(order: boolean) {
    /**
    *  this._languageSubject
      .asObservable()
      .pipe(
        map((languages) => {
          console.log(languages);

          languages.sort(function (a, b) {
            if (order) {
              if (a.categoria > b.categoria) {
                return 1;
              }
              if (a.categoria < b.categoria) {
                return -1;
              }
              // a must be equal to b
              return 0;
            } else {
              if (a.categoria > b.categoria) {
                return -1;
              }
              if (a.categoria < b.categoria) {
                return 1;
              }
              // a must be equal to b
              return 0;
            }
          });
        })
      )
      .subscribe();
    */
  }

  sortByType(order: boolean) {
    /**
    *  this._filterLanguages = this._filterLanguages.sort(function (a, b) {
      if (order) {
        if (a.tipo > b.tipo) {
          return 1;
        }
        if (a.tipo < b.tipo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      } else {
        if (a.tipo > b.tipo) {
          return -1;
        }
        if (a.tipo < b.tipo) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
    });
    */
  }

  sortByValoration(order: boolean) {
    /**
    *  this._filterLanguages = this._filterLanguages.sort(function (a, b) {
      if (order) {
        if (a.valoracion > b.valoracion) {
          return 1;
        }
        if (a.valoracion < b.valoracion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      } else {
        if (a.valoracion > b.valoracion) {
          return -1;
        }
        if (a.valoracion < b.valoracion) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
    });
    */
  }

  refreshLanguages() {
    return this._languageSubject.next(this._languages);
  }
}

/**
 *
 *
 * this._filterCategories = [];
          console.log(
            'Filtradas despues de igualar a []',
            this._filterCategories
          );
          let newTypes: Type[] = [];
          console.log('Lenguajes iniciales', languages);
          languages.map((language, i) => {
            console.log(`lenguaje ${i}:`, language);
          });
 *  //tengo que hacer e push si y solo si el lenguaje no existe en la lista de lenguajes
            //cada vez que pase por aquí debo suscribirme al observable _aviableCategoriesSubject
            // y actualizar estos datos
            //en el HTML recibo estos observables y me susbribo a ellos con el pipe async
            this._aviableCategoriesSubject
              .asObservable()
              .pipe(
                map((categories, j) => {
                  console.log('categorias iniciales', categories);
                  console.log('categorias filtradas', this._filterCategories);
                  const value = this._filterCategories.find(
                    (c) => language.categoria === c.categoria
                  );
                  console.log('Valor buscado', value);
                  if (value === undefined) {
                    this._filterCategories.push({
                      categoria: language.categoria,
                    });
                  }
                  //si entramos aqui es que hemos hecho match
                  //debemos crear un nuevo array con los lenguajes
                  //debemos agregar las categorias de estos lenguajes a
                  //un nuevo array de newCategories siempre y cuando estas categorias
                  //no se repitan.
                  //Debemos emitir este array y hacer el subscribe en el html
                  console.log(`vuelta ${i} del map`);
                  console.log(`vuelta ${j} del find`);
                  console.log(`categoria ${j}:`, language.categoria);
                  console.log(
                    'nuevo array de categorias',
                    this._filterCategories
                  );

                  return this._filterCategories;
                })
              )
              .subscribe((categories) =>
                console.log('en el subscribe del servicio', categories)
              );
 *
 *
 */
