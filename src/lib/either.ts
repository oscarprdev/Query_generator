export type Either<E, A> = Error<E> | Success<A>;

enum EitherTag {
	Error = 'Error',
	Success = 'Success',
}

export interface Error<E> {
	readonly _tag: EitherTag.Error;
	readonly error: E;
}

export const errorResponse = <E, A = never>(e: E): Either<E, A> => ({
	_tag: EitherTag.Error,
	error: e,
});

export interface Success<A> {
	readonly _tag: EitherTag.Success;
	readonly success: A;
}

export const successResponse = <A, E = never>(a: A): Either<E, A> => ({
	_tag: EitherTag.Success,
	success: a,
});

export const isError = <E, A>(a: Either<E, A>): a is Error<E> => a._tag === EitherTag.Error;
