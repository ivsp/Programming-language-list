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
import { Observable, filter, BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  private _languages: Language[] =
    localStorage.getItem('lenguajes') !== null
      ? JSON.parse(localStorage.getItem('lenguajes')!)
      : datosIniciales;
  private _filterLanguages: Language[] = this._languages;
  private _id: number =
    this._languages.length === 0 ? 1 : this._languages.length + 1;
  private _searchValue!: string;
  private _categoryValue!: string;
  private _typeValue!: string;
  private _valorationValue!: string;
  private _languageSubject = new BehaviorSubject<Language[]>(this._languages);
  private _aviableCategories: Category[] = categorias;
  private _aviableTypes: Type[] = tipos;
  private _aviableValoration: Array<string> = [];
  /**
   * Creo un get para mandar la información de los lenguajes
   * ya que no quiero que estos lenguajes se puedan manipular desde ningun
   * otro sitio de mi aplicacion
   */

  get languages$(): Observable<Language[]> {
    return this._languageSubject.asObservable().pipe(
      //Aquí implemento la logica para realizar el filtro de búsqueda. Paso a paso
      //1º el filtro del input
      map((language) => {
        if (!this._searchValue || !this._searchValue.length) {
          return language;
        }
        this._filterLanguages = this._languages.filter((language) => {
          return `${language.nombre} ${language.categoria} ${language.tipo}`
            .toLowerCase()
            .includes(this._searchValue.toLowerCase());
        });
        return this._filterLanguages;
      }),
      //2º de los datos obtenidos recoger los valores para mandarselos al componente
      tap((languages) => {
        let newCategories: Category[] = [];
        let newTypes: Type[] = [];
        languages.map((language) => {
          console.log(language);
          //guardo en un array las categorias disponibles y lo asigno al _aviableCategories
          newCategories.push({ categoria: language.categoria });
          newTypes.push({ tipo: language.tipo });
        });
        this._aviableCategories = newCategories;
        this._aviableTypes = newTypes;
      }),
      //3º el filtro de los selectores realizaremos otro map()
      map((language) => {
        if (!this._categoryValue || !this._categoryValue.length) {
          return language;
        }
        this._filterLanguages = this._filterLanguages.filter((language) => {
          return language.categoria === this._categoryValue;
        });
        return this._filterLanguages;
      }),
      //repetir los pasos 2 y 3 tantas veces como filtros de selectores haya
      map((language) => {
        if (!this._typeValue || !this._typeValue.length) {
          return language;
        }
        this._filterLanguages = this._filterLanguages.filter((language) => {
          return language.tipo === this._typeValue;
        });
        return this._filterLanguages;
      }),
      tap(() => {
        console.log('Dentro del subject', this._valorationValue);
      }),
      map((language) => {
        if (!this._valorationValue || !isNaN(parseInt(this._typeValue))) {
          console.log('En el if', this._valorationValue);
          return language;
        }
        this._filterLanguages = this._filterLanguages.filter((language) => {
          console.log('En el else', parseInt(this._valorationValue));

          return language.valoracion >= parseInt(this._valorationValue);
        });
        return this._filterLanguages;
      })
    );
  }

  get aviableCategories(): Category[] {
    return this._aviableCategories;
  }
  get aviableTypes(): Type[] {
    return this._aviableTypes;
  }
  get filteredLanguages(): Language[] {
    return [...this._filterLanguages];
  }

  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() {}

  addLanguage(languaje: Language) {
    const dataForm = {
      ...languaje,
      id: this._id,
    };
    this._languages = [...this._languages, dataForm];
    console.log(this._languages);
    this._id++;
    localStorage.setItem('lenguajes', JSON.stringify(this._languages));
  }

  filterLanguagesByName(inputData: string) {
    //función que ejecutará una función de refresco, que hará que el observable emita un nuevo valor y devolverá el input
    this._searchValue = inputData;
    this.refresh();
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
    this.refresh();
  }

  filterType(type: string) {
    if (type === 'Todos') {
      this._typeValue = '';
    } else {
      this._typeValue = type;
    }
    this.refresh();
  }

  filterValoration(valoration: string) {
    this._valorationValue = valoration;
    this.refresh();
  }

  sortByName(order: boolean) {
    this._filterLanguages = this._filterLanguages.sort(function (a, b) {
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
  }

  sortByCategory(order: boolean) {
    this._filterLanguages = this._filterLanguages.sort(function (a, b) {
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
  }

  sortByType(order: boolean) {
    this._filterLanguages = this._filterLanguages.sort(function (a, b) {
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
  }

  sortByValoration(order: boolean) {
    this._filterLanguages = this._filterLanguages.sort(function (a, b) {
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
  }

  refresh() {
    return this._languageSubject.next(this._languages);
  }
}
