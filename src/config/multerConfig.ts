import multer from "multer";
import path from "path";;
import Crypto from 'crypto';

const multerConfig = {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,  path.resolve(__dirname, '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            Crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            })
            
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(new Error("Tipo de arquivo inválido."))
        }
    }

}

export default multerConfig;