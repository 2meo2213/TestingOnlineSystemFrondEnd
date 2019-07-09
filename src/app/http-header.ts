import { HttpHeaders } from '@angular/common/http';

const http = () => {
    const permission = sessionStorage.getItem('currentPermission');
    return new HttpHeaders({ permission, 'Content-Type': 'application/json' });
};

export { http };
