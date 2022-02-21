import firebase, { database } from '../../firebase';

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                console.log('success: ', res)
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid
                }
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(dataUser)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: false })
                reject(false)
            })
    })
}

export const logoutUser = (data) => (dispatch) => {
    firebase.auth().signOut().then(() => {
        console.log("berhasil logout");
        dispatch({ type: 'CHANGE_ISLOGIN', value: false })
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        console.log("gagal logout");
        dispatch({ type: 'CHANGE_ISLOGIN', value: true })
    });
}

export const addDataSiswa = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('datasiswa/' + data.nis).set({
            nis: data.nis,
            nama: data.nama,
            tempat: data.tempat,
            tanggal: data.tanggal,
            alamat: data.alamat,
            tingkat: data.tingkat,
            rombel: data.rombel,
            jurusan: data.jurusan,
            kelas: data.tingkat + data.jurusan + data.rombel,
            kelas_tanggal: data.tingkat + data.jurusan + data.rombel+data.tanggal
        })
    })
}
export const addDataUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('user/' + data.nis).set({
            nis: data.nis,
            nama: data.nama,
            kelas: data.tingkat + data.jurusan + data.rombel,
            password: data.password
        })
    })
}

export const getDataSiswa = (data) => (dispatch) => {
    const urlSiswa = database.ref('datasiswa/');
    return new Promise((resolve, reject) => {
        urlSiswa.on('value', function (snapshot) {
            console.log('getData: ', snapshot.val());
            const datas = [];
            Object.keys(snapshot.val()).map(key => {
                datas.push({
                    id: key,
                    datas: snapshot.val()[key]
                })
            });
            dispatch({ type: 'SET_DATA', value: datas });
            resolve(snapshot.val())
        });
    })
}

export const getJumlahSiswa = (data) => (dispatch) => {
    const urlSiswa = database.ref('datasiswa/');
    urlSiswa.once("value")
            .then(function(snapshot) {
                const jumlah = snapshot.numChildren();
                dispatch({type: 'SET_JUMSIS', value: jumlah});
                console.log('jumsis: ', jumlah);
            });
            
}
export const getJumlahAbsen = (data) => (dispatch) => {
    const urlSiswa = database.ref('uploads/');
    urlSiswa.once("value")
            .then(function(snapshot) {
                const jumlahab = snapshot.numChildren();
                dispatch({type: 'SET_JUMAB', value: jumlahab});
                console.log('jumab: ', jumlahab);
            });
            
}

export const getDataUser = (data) => (dispatch) => {
    const urlUser = database.ref('user/').orderByChild('kelas').equalTo(data.ustingkat+data.usjurusan+data.usrombel);
    return new Promise((resolve, reject) => {
        urlUser.on('value', function (snapshot) {
            console.log('getUser: ', snapshot.val());

            const datausers = [];
            Object.keys(snapshot.val()).map(key => {
                datausers.push({
                    id: key,
                    datausers: snapshot.val()[key]
                })
            });
            dispatch({ type: 'SET_USER', value: datausers });
            resolve(snapshot.val())
        });
    })
}

export const getDataAbsen = (data) => (dispatch) => {
    const urlAbsen = database.ref('uploads/').orderByChild('waktu')
    .startAt(data.dateStart)
    .endAt(data.dateEnd+" "+data.timeEnd);
    return new Promise((resolve, reject) => {
        urlAbsen.on('value', function (snapshot) {
            const jumlah = snapshot.numChildren();
            const dataabs = [];
            Object.keys(snapshot.val()).map(key => {
                dataabs.push({
                    id: key,
                    dataabs: snapshot.val()[key]
                })
            });
            console.log('dataabs: ', dataabs);
            console.log('count: '+jumlah);
            dispatch({ type: 'SET_ABSENKELAS', value: dataabs });
            resolve(snapshot.val())

        });
    })
}

export const updateDataSiswa = (data) => (dispatch) => {
    const urlSiswa = database.ref('datasiswa/' + data.siswaId);
    return new Promise((resolve, reject) => {
        urlSiswa.update({
            nis: data.nis,
            nama: data.nama,
            tempat: data.tempat,
            tanggal: data.tanggal,
            alamat: data.alamat,
            tingkat: data.tingkat,
            rombel: data.rombel,
            jurusan: data.jurusan,
            kelas: data.tingkat + data.jurusan + data.rombel,
            kelas_tanggal: data.tingkat + data.jurusan + data.rombel+"_"+data.tanggal
        }, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true)
            }
        });
    })
}

export const updateDataUser = (data) => (dispatch) => {
    const urlUser = database.ref('user/' + data.siswaId);
    return new Promise((resolve, reject) => {
        urlUser.update({
            nis: data.nis,
            nama: data.nama,
            kelas: data.tingkat + data.jurusan + data.rombel
        }, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true)
            }
        });
    })
}

export const deleteDataSiswa = (data) => (dispatch) => {
    const urlSiswa = database.ref('datasiswa/' + data.siswaId);
    return new Promise((resolve, reject) => {
        urlSiswa.remove();
    })
}

export const deleteDataUser = (data) => (dispatch) => {
    const urlSiswa = database.ref('user/' + data.siswaId);
    return new Promise((resolve, reject) => {
        urlSiswa.remove();
    })
}

